import React, { useEffect, useRef, useState, forwardRef } from 'react';

interface ImageProcessorProps {
  imageUrl: string;
  maxHeight: number;
  maxWidth: number;
  backgroundWhite?: boolean; // Control background color
}

// Wrap the component with React.forwardRef
const ImageProcessor = forwardRef<HTMLImageElement, ImageProcessorProps>(
  ({ imageUrl, maxHeight, maxWidth, backgroundWhite = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    const processImage = (imageUrl: string) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = imageUrl;

      image.onload = () => {
        setImageLoaded(true);
        setImageError(false);

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });

        if (canvas && ctx) {
          canvas.width = image.width;
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          let minX = canvas.width;
          let minY = canvas.height;
          let maxX = 0;
          let maxY = 0;

          for (let i = 0; i < data.length; i += 4) {
            if (data[i] < 240 || data[i + 1] < 240 || data[i + 2] < 240) {
              const x = (i / 4) % canvas.width;
              const y = Math.floor((i / 4) / canvas.width);
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }

          const width = maxX - minX;
          const height = maxY - minY;

          if (width <= 0 || height <= 0) {
            console.error("Invalid cropped dimensions:", { width, height });
            return;
          }

          const croppedCanvas = document.createElement('canvas');
          const croppedCtx = croppedCanvas.getContext('2d');

          if (croppedCtx) {
            croppedCanvas.width = width;
            croppedCanvas.height = height;

            croppedCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
            const croppedImgData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height);
            const croppedData = croppedImgData.data;

            for (let i = 0; i < croppedData.length; i += 4) {
              if (croppedData[i] > 240 && croppedData[i + 1] > 240 && croppedData[i + 2] > 240) {
                croppedData[i + 3] = 0; // Make pixel transparent
              }
            }

            croppedCtx.putImageData(croppedImgData, 0, 0);

            const aspectRatio = width / height;
            let finalWidth = maxWidth - 30; // Adjust for padding (15px each side)
            let finalHeight = maxHeight - 30; // Adjust for padding (15px each side)

            if (width > height) {
              finalHeight = finalWidth / aspectRatio;
              if (finalHeight > maxHeight - 30) {
                finalHeight = maxHeight - 30;
                finalWidth = finalHeight * aspectRatio;
              }
            } else {
              finalWidth = finalHeight * aspectRatio;
              if (finalWidth > maxWidth - 30) {
                finalWidth = maxWidth - 30;
                finalHeight = finalWidth / aspectRatio;
              }
            }

            const resizedCanvas = document.createElement('canvas');
            resizedCanvas.width = finalWidth + 30; // Add 15px padding to width
            resizedCanvas.height = finalHeight + 30; // Add 15px padding to height

            const resizedCtx = resizedCanvas.getContext('2d');
            if (resizedCtx) {
              // Optionally fill with white background if required
              if (backgroundWhite) {
                resizedCtx.fillStyle = 'white';
                resizedCtx.fillRect(0, 0, resizedCanvas.width, resizedCanvas.height);
              }

              resizedCtx.drawImage(
                croppedCanvas, 
                0, 
                0, 
                width, 
                height, 
                15, // 15px padding on left
                15, // 15px padding on top
                finalWidth, 
                finalHeight
              );

              const finalImageDataUrl = resizedCanvas.toDataURL('image/webp');
              setProcessedImage(finalImageDataUrl);
            }
          }
        }
      };

      image.onerror = (error) => {
        setImageLoaded(false);
        setImageError(true);
      };
    };

    useEffect(() => {
      if (imageUrl) {
        setImageLoaded(false);
        setImageError(false);
        processImage(imageUrl);
      }
    }, [imageUrl, backgroundWhite]); // Add backgroundWhite as a dependency

    return (
      <div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {imageError ? null : (
          imageLoaded && processedImage ? (
            <img ref={ref} src={processedImage} alt="Processed" style={{ maxWidth, maxHeight }} />
          ) : (
            <p style={{ display: imageLoaded ? 'none' : 'block' }}>Loading image...</p>
          )
        )}
      </div>
    );
  }
);

export default ImageProcessor;
