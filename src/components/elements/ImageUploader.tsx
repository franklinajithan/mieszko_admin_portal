import React, { useRef, useState, useEffect } from 'react';
import defaultProductImage from '../../assets/img/default-product-image.png';

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
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onImageChange) onImageChange(event);

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          processImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (imageUrl: string) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Remove white background (adjust color range as needed)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          // Check for white color or near-white (adjust tolerance)
          if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
            data[i + 3] = 0; // Make pixel transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedImage(canvas.toDataURL()); // Get the processed image as data URL
      }
    };
  };

  const handleImageClick = () => {
    if (onImageClick) onImageClick();
  };

  const handleClosePopup = () => {
    if (onClosePopup) onClosePopup();
  };

  return (
    <div>
      <div className="col-span-1 flex flex-col justify-center items-center h-full bg-gradient-to-br p-4 rounded-lg ">
        <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-48 lg:h-48 ">
          <img
            src={processedImage || imagePreview || defaultProductImage}
            alt="Profile"
            onClick={handleImageClick}
            className="w-full h-full object-contain  transform scale-90 transition-transform duration-300 ease-in-out hover:scale-100"
            style={{ position: 'relative', zIndex: 10 }}
          />
        </div>

        <div className="flex">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file-input"
            className="hidden"
          />
          <label htmlFor="file-input" className="btn-cyan">Upload Product Image</label>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-zinc-200 bg-opacity-60 flex justify-center items-center z-50">
          <div className="relative p-4 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-screen">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 p-2 bg-white text-black rounded-full shadow-md flex items-center justify-center hover:bg-zinc-200"
              style={{ fontSize: '1.25rem' }}
            >
              &times;
            </button>
            <img
              src={processedImage || imagePreview || defaultProductImage}
              alt="Product"
              className="w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
