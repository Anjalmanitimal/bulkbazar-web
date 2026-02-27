import axios from "./axios";
import { API } from "./endpoints";

// ✅ get unique categories
export const getCategoriesAPI = async (): Promise<string[]> => {
  const res = await axios.get(API.PRODUCTS.GET_ALL);

  const products = res.data.data as any[];

  // ✅ explicitly type Set<string>
  const categories = Array.from(
    new Set<string>(products.map((p) => p.category)),
  );

  return categories;
};

// ✅ get products by category
export const getProductsByCategoryAPI = async (
  category: string,
): Promise<any[]> => {
  const res = await axios.get(API.PRODUCTS.GET_ALL);

  const products = res.data.data as any[];

  return products.filter((p) => p.category === category);
};
