import axiosInstance from '../helpers/axiosInstance'

export const getBrand = () => axiosInstance.get(`/brand`);
export const addBrand = (data:any) => axiosInstance.post(`/brand`,data);
export const getBrandById = (id:any) => axiosInstance.get(`/brand/${id}`);
export const updateBrand= (id:any,data:any) => axiosInstance.put(`/brand/${id}`,data);
export const DeleteBrand = (id:any) => axiosInstance.delete(`/brand/${id}`);

