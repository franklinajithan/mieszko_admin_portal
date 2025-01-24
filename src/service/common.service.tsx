import axiosInstance from "../helpers/axiosInstance";

export const getRole = () => axiosInstance.get(`/role`);

export const getOrderUOMTypeList = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { label: "Kilogram", value: "kg" },
      { label: "Liter", value: "l" },
      { label: "Piece", value: "pc" },
      { label: "Meter", value: "m" },
    ]);
  });
};

export const paymentStatus = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { label: "Paid", value: "paid" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ]);
  });
};
