import axiosInstance from '../helpers/axiosInstance'


export const getVat = () => axiosInstance.get(`/vat`); // Get all VAT records
export const addVat = (vat: any) => axiosInstance.post(`/vat`, vat); // Add a new VAT record
export const updateVat = (id: any, vat: any) => axiosInstance.put(`/vat/${id}`, vat); // Update an existing VAT record
export const deleteVat = (id: any) => axiosInstance.delete(`/vat/${id}`); // Delete a VAT record