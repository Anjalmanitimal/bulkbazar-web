import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Create Product
export const createSellerProduct = async (formData: FormData) => {
  const res = await axios.post(
    `${API_URL}/api/products`,
    formData,
    getAuthHeaders(),
  );

  return res.data;
};

// ✅ Get ALL products (temporary until seller route added)
export const getSellerProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`, getAuthHeaders());

  return res.data;
};

// ✅ Delete
export const deleteSellerProduct = async (id: string) => {
  const res = await axios.delete(
    `${API_URL}/api/products/${id}`,
    getAuthHeaders(),
  );

  return res.data;
};
