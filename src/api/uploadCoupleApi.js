import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const uploadCouple = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/tambah`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}