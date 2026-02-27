export interface CartPricing {
  moq: number;
  price: number;
}

export interface CartProduct {
  _id: string;
  name: string;
  image: string;
  pricing: CartPricing[];
}

export interface CartItem extends CartProduct {
  quantity: number;
}

const CART_KEY = "bulkbazar_cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: CartProduct) => {
  const cart = getCart();

  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += product.pricing[0].moq;
  } else {
    cart.push({
      ...product,
      quantity: product.pricing[0].moq,
    });
  }

  saveCart(cart);

  window.dispatchEvent(new Event("cartUpdated"));
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();

  const item = cart.find((i) => i._id === productId);

  if (!item) return;

  item.quantity = quantity;

  saveCart(cart);

  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter((i) => i._id !== productId);

  saveCart(cart);

  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(new Event("cartUpdated"));
};

export const getPriceForQuantity = (
  pricing: CartPricing[],
  quantity: number,
) => {
  let price = pricing[0].price;

  for (const tier of pricing) {
    if (quantity >= tier.moq) {
      price = tier.price;
    }
  }

  return price;
};
export const getCartCount = (): number => {
  const cart = getCart();

  return cart.reduce((total, item) => total + item.quantity, 0);
};
