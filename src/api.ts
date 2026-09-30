import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface SignupPayload {
  email: string;
  password: string;
  termsAndCondition: boolean;
  role: "landlord" | "tenant";
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const signupUser = async (payload: SignupPayload) => {
  const response = await api.post("/new-user/signup", payload);
  return response.data;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const response = await api.post("/new-user/sendotp", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/new-user/signin", payload);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};

export default api;
