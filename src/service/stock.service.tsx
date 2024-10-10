import axiosInstance from '../helpers/axiosInstance'

export const getProductId = (data:any) => axiosInstance.post(`/msp/product-id`, data);

export const getMSPStockTake = (data:any) => axiosInstance.post(`/msp`, data);

