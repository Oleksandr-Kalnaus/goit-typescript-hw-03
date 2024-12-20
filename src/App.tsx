import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import apiRequests from "./utils/apiRequests";
import { ImageData } from "./types/types";
import "modern-normalize";

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [totalImages, setTotalImages] = useState<number>(0);
  const imageCardRef = useRef<HTMLDivElement>(null);

  const onSubmit = (searchQuery: string) => {
    if (searchQuery === query) return;
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (query === "") return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const { images: fetchedImages, total } = await apiRequests(query, page);

        if (fetchedImages.length === 0) {
          setError("No images found.");
          return;
        }

        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setTotalImages(total);
      } catch (err: any) {
        setError(`Failed to fetch images. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (imageCardRef.current) {
      const cardHeight = imageCardRef.current.clientHeight || 0;
      const scrollPosition = window.pageYOffset + cardHeight * 3;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [images]);

  const loadMoreImages = () => {
    if (images.length >= totalImages) return;
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageData: ImageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery
          imageCards={images}
          onImageClick={openModal}
          cardRef={imageCardRef}
        />
      )}

      {loading && <Loader />}

      {images.length > 0 && !loading && images.length < totalImages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.regularImage}
          altText="Selected large image"
          description={selectedImage.description}
          likes={selectedImage.likes}
          dateOfCreate={selectedImage.dateOfCreate}
        />
      )}
    </>
  );
};

export default App;
