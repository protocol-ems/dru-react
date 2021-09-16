import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

//this is the main axios request instance because it will set the token for us.

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

// this is the style I saw for how to send stripe info. I really like this class approach.
// it is bad probably to have two different styles, but for now it is working.

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
