import { imageUrl } from '@/_config';
import ImageUploader from '@/components/elements/ImageUploader';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';



const ProductCard = ({ product }: any) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const handleImageClick = () => {
    setSelectedImage(imageUrl + 'items/' + product.item_image);
    setIsPopupOpen(true);
};

const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
};

  return (
    <div className="col-span-3 max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 bg-white">
      <ImageUploader

      
        onImageClick={handleImageClick}
        isPopupOpen={isPopupOpen}
        onClosePopup={handleClosePopup}
        uploadButton={false}
        imagePreview={imageUrl + 'items/' + product.item_image} />
      {/* <img className="w-full object-cover h-25" src={imageUrl + 'items/' + product.item_image} /> */}

      <div className="space-y-3 pl-2">
        <div className="flex justify-between items-center">
        <div className="text-md font-bold text-gray-800 h-12 overflow-hidden">{product.itemName}</div> {/* Adjust height as needed */}
        </div>
        <span className="text-sm text-gray-500 ">({product.itemCode})</span>


        <div className="text-sm text-gray-500">
          <div><span className="font-semibold">Brand:</span> {product.brand.brandName}</div>
          <div><span className="font-semibold mt-1">Category Code:</span> {product.categoryCode}</div>
          <div><span className="font-semibold mt-1">Retail UOM:</span> {product.retailUOM}</div>
        </div>

        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="text-black p-1 rounded-lg hover:bg-gray-300 transition-colors flex items-center">

            <span>View</span>
            <FontAwesomeIcon icon={faEye} className="ml-2" />
          </button>
          <button className="text-yellow-500 p-1 rounded-lg hover:bg-yellow-600 transition-colors flex items-center">

            <span>Edit</span>
            <FontAwesomeIcon icon={faEdit} className="ml-2" />
          </button>
        </div>
      </div>
      </div>

    </div>
  );
};

export default ProductCard;
