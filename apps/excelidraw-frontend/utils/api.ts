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

import toast from "react-hot-toast";

export const generateSVGShape = async (prompt: string) => {
  try {
    const response = await fetch("/api/generate-svg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate SVG path");
    }

    const data = await response.json();
    return data.svgPath;
  } catch (error) {
    toast.error("Error generating SVG. Please try again.");
    throw error;
  }
};
