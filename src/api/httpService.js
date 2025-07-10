// src/api/httpService.js
import axiosInstance from "./axios";

export const getRequest = async (url, params = {}) => {
  const res = await axiosInstance.get(url, { params });
  return res.data;
};

export const postRequest = async (url, data = {}) => {
  const res = await axiosInstance.post(url, data);
  return res.data;
};

export const putRequest = async (url, data = {}) => {
  const res = await axiosInstance.put(url, data);
  return res.data;
};


export const deleteRequest = async (url) => {
  const res = await axiosInstance.delete(url);
  return res.data;
};
