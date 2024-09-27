import axiosInstance from '../helpers/axiosInstance'

export const getRole = () => axiosInstance.get(`/role`);
