import axiosInstance from '../helpers/axiosInstance'

export const getPromotionProductList = () => axiosInstance.get(`/label`);

export const uploadPromotionList = (data:any) => axiosInstance.post(`/label`,data);

export const uploadLabelImage = (data:any) => axiosInstance.post(`/image/upload-label-image`,data);

export const updateProductList = (id:any,data:any) => axiosInstance.put(`/label/${id}`,data);
