import React from 'react';
import defaultProductImage from '../assets/img/default-product-image.png';

interface ImageUploaderProps {
  imagePreview?: string | null;
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageClick?: () => void;
  isPopupOpen: boolean;
  onClosePopup?: () => void;
  selectedImage?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  onImageChange,
  onImageClick,
  isPopupOpen,
  onClosePopup,
  selectedImage
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onImageChange) onImageChange(event);
  };

  const handleImageClick = () => {
    if (onImageClick) onImageClick();
  };

  const handleClosePopup = () => {
    if (onClosePopup) onClosePopup();
  };

  return (
    <div className="col-span-1 flex flex-col items-center bg-gradient-to-br p-1 rounded-lg w-1/5">
      <div className="relative mb-4 p-2 rounded-lg shadow-2xl">
        <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-48 lg:h-48 relative overflow-hidden rounded-lg border-4 shadow-lg transform transition-transform hover:scale-110 cursor-pointer">
          <img
            src={imagePreview || defaultProductImage}
            alt="Product"
            onClick={handleImageClick}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-input"
          className="hidden"
        />
        <label htmlFor="file-input" className="btn-cyan">Upload</label>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-zinc-200 bg-opacity-60 flex justify-center items-center z-50">
        <div className="relative p-4 rounded-lg max-w-screen-md max-h-screen">
          <button
            onClick={handleClosePopup}
            className="absolute top-2 right-2 w-10 h-10 p-2 bg-white text-black rounded-full shadow-md flex items-center justify-center hover:bg-zinc-200"
            style={{ fontSize: '1.5rem' }}
          >
            &times;
          </button>
          <img src={selectedImage || defaultProductImage} alt="Product" className="w-auto max-h-[80vh]" />
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ImageUploader;
