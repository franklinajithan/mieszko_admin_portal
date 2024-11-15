import axiosInstance from '../helpers/axiosInstance'

export const getReduceToClear = () => axiosInstance.get(`/rtc`);
export const addReduceToClear = (data:any) => axiosInstance.post(`/rtc/`,data);
export const updateReduceToClear = (data:any) => axiosInstance.put(`/rtc/`,data);