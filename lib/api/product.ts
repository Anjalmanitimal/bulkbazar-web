import axios from "./axios";

export interface PricingTier {
  moq: number;
  price: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  pricing: PricingTier[];
  sellerId: string;
}

export const getProducts = async () => {
  try {
    const res = await axios.get("/api/products");

    console.log("PRODUCT API RESPONSE:", res.data);

    return res.data.data; // IMPORTANT
  } catch (error: any) {
    console.error("PRODUCT API ERROR:", error.response?.data || error.message);
    throw new Error("Failed to load products");
  }
};
