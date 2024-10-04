import axiosInstance from '../helpers/axiosInstance'


export const getCompany = () => axiosInstance.get(`/company`);
export const addCompany = (company:any) => axiosInstance.post(`/company`, company);
export const updateCompany = (id:any,company:any) => axiosInstance.put(`/company/${id}`, company);
export const deleteCompany = (id:any) => axiosInstance.delete(`/company/${id}`);
export const getCompanyById = (id:any) => axiosInstance.get(`/company/${id}`);

export const getStore = () => axiosInstance.get(`/store`);
export const addStore = (store:any) => axiosInstance.post(`/store`, store);
export const updateStore = (id:any,store:any) => axiosInstance.put(`/store/${id}`, store);
export const deleteStore = (id:any) => axiosInstance.delete(`/store/${id}`);
export const getStoreById = (id:any) => axiosInstance.get(`/store/${id}`);

