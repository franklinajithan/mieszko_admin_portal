import axiosInstance from '../helpers/axiosInstance'

export const getBrand = () => axiosInstance.get(`/brand`);
export const addBrand = (data:any) => axiosInstance.post(`/brand/create`,data);
