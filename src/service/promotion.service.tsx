import axiosInstance from '../helpers/axiosInstance'

export const getPromotionProductList = () => axiosInstance.get(`/label`);

export const uploadPromotionList = (data:any) => axiosInstance.post(`/label`,data);

export const uploadLabelImage = (data:any) => axiosInstance.post(`/image/upload-label-image`,data);

export const updateProductList = (id:any,data:any) => axiosInstance.put(`/label/${id}`,data);

export const UpdateLabelList = (data:any) => axiosInstance.post(`/default-label`,data);

export const printLog = (data:any) => axiosInstance.post(`/label-print-log`,data);

export const getPromotionList = () => {
    // Hardcoded promotion data
    const hardcodedPromotions = [
      { id: 1, name: "Buy One Get One Free", description: "BOGO offer on select items", active: true },
      { id: 2, name: "20% Off", description: "Flat 20% discount on electronics", active: true },
      { id: 3, name: "Free Shipping", description: "Free shipping on orders over $50", active: false },
    ];

    return axiosInstance.get(`/promotionList`)
      .then((response) => {
        console.log("Fetched Promotions from API:", response.data);
        return response.data; // Return API data
      })
      .catch((error) => {
        console.error("Error fetching promotions. Returning hardcoded list:", error);
        return hardcodedPromotions; // Return hardcoded data on failure
      });
  };

