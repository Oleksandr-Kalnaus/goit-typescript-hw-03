import css from "./ImageCard.module.css";
import { ImageCardProps } from "../../types/types";

const ImageCard: React.FC<ImageCardProps> = ({
  imageCard,
  onImageClick,
  cardRef,
}) => {
  const { smallImage, description } = imageCard;

  const handleClick = () => {
    onImageClick(imageCard);
  };

  return (
    <div className={css.imageCard} onClick={handleClick} ref={cardRef}>
      <img src={smallImage} alt={description} className={css.image} />
    </div>
  );
};

export default ImageCard;
