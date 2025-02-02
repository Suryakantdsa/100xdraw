import axios from "axios";

export const HTTP_BACKEND = "http://localhost:4001";

export const api = axios.create({
  baseURL: HTTP_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

// Signup Request
export const signup = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await api.post("/signup", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Signin Request
export const signin = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/signin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// create room
export const roomCreate = async (data: { name: string }, token: string) => {
  try {
    const response = await api.post("/room", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
