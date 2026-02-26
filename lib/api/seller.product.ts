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

// ✅ Get Seller Products (if you add backend route later)
export const getSellerProducts = async () => {
  const res = await axios.get(
    `${API_URL}/api/products/seller`,
    getAuthHeaders(),
  );

  return res.data;
};

// ✅ Delete Product
export const deleteSellerProduct = async (id: string) => {
  const res = await axios.delete(
    `${API_URL}/api/products/${id}`,
    getAuthHeaders(),
  );

  return res.data;
};
