import axiosInstance from '../helpers/axiosInstance'

export const getUser = () => axiosInstance.get(`/user`);