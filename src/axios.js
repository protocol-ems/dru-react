import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";
//http://127.0.0.1:8000/users/register/
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("Authorization")
      ? "Token " + localStorage.getItem("Authorization")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const registerInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export const axiosInstanceWithImage = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("Authorization")
      ? "Token " + localStorage.getItem("Authorization")
      : null,
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    accept: "application/json",
  },
});

export default class ApiService {
  static saveStripeInfo(data = {}) {
    return axiosInstance.post("payments/save-stripe-info/", data);
  }
  static getCustomerInfo(data = {}) {
    return axiosInstance.post("payments/customer-info/", data);
  }
  static getSubscriptionInfo(data = {}) {
    return axiosInstance.post("payments/subscription-info/", data);
  }
}
