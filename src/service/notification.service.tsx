import axiosInstance from '../helpers/axiosInstance'


export const postSubscribe = (subscriptionData:any) => axiosInstance.post(`/subscribe`,subscriptionData); // Get all VAT records