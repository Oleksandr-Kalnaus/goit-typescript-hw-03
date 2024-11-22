export interface ImageData {
  id: string;
  description: string;
  smallImage: string;
  regularImage: string;
  likes: number;
  dateOfCreate: string;
}

export interface ImageGalleryProps {
  imageCards: ImageData[];
  onImageClick: (imageData: ImageData) => void;
  cardRef: React.RefObject<HTMLDivElement> | null;
}

export interface ImageCardProps {
  imageCard: ImageData;
  onImageClick: (imageData: ImageData) => void;
  cardRef: React.RefObject<HTMLDivElement> | null;
}

export interface ErrorMessageProps {
  message: string;
}

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export interface LoadMoreBtnProps {
  onClick: () => void;
}

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
  description: string;
  likes: number;
  dateOfCreate: string;
}
