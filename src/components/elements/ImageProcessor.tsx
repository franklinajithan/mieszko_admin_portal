import React, { useEffect, useRef, useState } from 'react';

interface ImageProcessorProps {
  imageUrl: string; // Prop type for image URL
  maxHeight: any; // Prop type for maximum height
  maxWidth: any; // Prop type for maximum width
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ imageUrl, maxHeight, maxWidth }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref for the canvas element
  const [processedImage, setProcessedImage] = useState<string | null>(null); // State for processed image URL

  // Function to process the image and remove the white background
  const processImage = (imageUrl: string) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Add this line
    image.src = imageUrl;

    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx) {
        // Set canvas dimensions to original image size first
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0); // Draw the original image on the canvas
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let minX = canvas.width;
        let minY = canvas.height;
        let maxX = 0;
        let maxY = 0;

        // Loop through the image data to find the bounding box
        for (let i = 0; i < data.length; i += 4) {
          // Check for non-white pixels
          if (data[i] < 240 || data[i + 1] < 240 || data[i + 2] < 240) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }

        // Calculate width and height of the bounding box
        const width = maxX - minX;
        const height = maxY - minY;

        // Create a new canvas for the cropped image
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');

        if (croppedCtx) {
          croppedCanvas.width = width;
          croppedCanvas.height = height;

          // Draw the cropped image on the new canvas
          croppedCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

          // Now remove the white background from the cropped image
          const croppedImgData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height);
          const croppedData = croppedImgData.data;

          for (let i = 0; i < croppedData.length; i += 4) {
            // Check for white color or near-white (adjust tolerance)
            if (croppedData[i] > 240 && croppedData[i + 1] > 240 && croppedData[i + 2] > 240) {
              croppedData[i + 3] = 0; // Make pixel transparent
            }
          }

          croppedCtx.putImageData(croppedImgData, 0, 0);
          setProcessedImage(croppedCanvas.toDataURL()); // Get the processed image as data URL
        }
      }
    };

    image.onerror = (error) => {
      console.error("Error loading image: ", error);
    };
  };

  useEffect(() => {
    if (imageUrl) {
      processImage(imageUrl); // Process the image whenever the URL changes
    }
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* Hidden canvas for processing */}
      {processedImage && (
        <img src={processedImage} alt="Processed" style={{ maxWidth, maxHeight }} />
      )}
    </div>
  );
};

export default ImageProcessor;
