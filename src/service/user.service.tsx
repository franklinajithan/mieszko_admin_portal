import axiosInstance from '../helpers/axiosInstance'

export const getUser = () => axiosInstance.get(`/user`);
export const addUser = (user:any) => axiosInstance.post(`/user/create`, user);
export const updateUser = (id:any,user:any) => axiosInstance.put(`/user/edit/${id}`, user);
export const deleteUser = (id:any) => axiosInstance.delete(`/user/delete/${id}`);
export const getUserById = (id:any) => axiosInstance.get(`/user/${id}`);

export const getPermission= () => axiosInstance.get(`/permission`);
export const getPermissionById= (id:any) => axiosInstance.get(`/role/${id}`);
export const updatePermissionById= (id:any, permission:any) => axiosInstance.put(`/role/${id}`, permission);

