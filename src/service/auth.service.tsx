
 import axiosInstance from '../helpers/axiosInstance'



//export const forgotPassword = (userDetail) => axiosBase.post(`/auth/forgotpassword`, userDetail)
export const userLogin = (loginDetail:any) => axiosInstance.post(`/auth/login`, loginDetail);
export const passwordReset = (passwordResetDetails:any) => axiosInstance.post(`/auth/forgotpassword`, passwordResetDetails);
export const validateResetToken = (token:any) => axiosInstance.get(`/auth/validatetoken/${token}`);
export const updatePassword = (updatePasswordDetails:any) => axiosInstance.post(`/auth/resetpassword`, updatePasswordDetails);


