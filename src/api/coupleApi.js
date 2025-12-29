import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const getCouple = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/api/${slug}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const allCouple = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/mempelai`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const updateGuest = async (slug, data) => {
  try {
    const response = await axios.put(`${API_URL}/api/tambah/tamu-undangan/${slug}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const deleteCouple = async (slug) => {
  try {
    const response = await axios.delete(`${API_URL}/api/delete/${slug}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}