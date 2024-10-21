import axiosInstance from '../helpers/axiosInstance'

export const getProduct = () => axiosInstance.get(`/item`);

export const addProduct = (data:any) => axiosInstance.post(`/item`,data);

export const getItemCode = () => axiosInstance.get(`/item/get-item-code`);

export const getItemDetail = (id:number) => axiosInstance.get(`/item/${id}`);

export const uploadProductImage = (data:any) => axiosInstance.post(`/image/upload-image`,data);