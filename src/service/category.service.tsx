import axiosInstance from '../helpers/axiosInstance'

export const getCategory = () => axiosInstance.get(`/category`);
export const addCategory = (data:any) => axiosInstance.post(`/category/create`, data);
export const addCategoryById = (categoryId:number) => axiosInstance.get(`/category/${categoryId}`);
export const updateCategoryById = (categoryId:number,data:any) => axiosInstance.get(`/category/edit/${categoryId}`, data);
export const getParentCategory = () => axiosInstance.get(`/category/parent`);