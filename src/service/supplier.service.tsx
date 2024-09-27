import axiosInstance from '../helpers/axiosInstance'

export const getSuppliers = () => axiosInstance.get(`/supplier`);
export const addSupplier = (supplier:any) => axiosInstance.post(`/supplier`, supplier);
export const updateSupplier = (id:any,supplier:any) => axiosInstance.put(`/supplier/edit/${id}`, supplier);
export const deleteSupplier = (id:any) => axiosInstance.delete(`/supplier/delete/${id}`);
export const getSupplierById = (id:any) => axiosInstance.get(`/supplier/${id}`);
