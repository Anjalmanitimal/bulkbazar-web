"use client";

import { useEffect, useState } from "react";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  getPriceForQuantity,
} from "@/lib/api/cart";
import { createOrderAPI } from "@/lib/api/order";
import { clearCart } from "@/lib/api/cart";

export default function BagPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refresh = () => setCart(getCart());

  const handleIncrease = (item: any) => {
    updateQuantity(item._id, item.quantity + item.pricing[0].moq);
    refresh();
  };

  const handleDecrease = (item: any) => {
    if (item.quantity <= item.pricing[0].moq) return;

    updateQuantity(item._id, item.quantity - item.pricing[0].moq);
    refresh();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    refresh();
  };
  const handleCheckout = async () => {
    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: getPriceForQuantity(item.pricing, item.quantity),
      }));

      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      await createOrderAPI(orderItems, total);

      clearCart();
      setCart([]);

      alert("Order placed successfully 🎉");
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = getPriceForQuantity(item.pricing, item.quantity);
    return sum + price * item.quantity;
  }, 0);

  if (cart.length === 0)
    return <div className="text-center text-xl mt-20">Your bag is empty</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bag</h1>

      <div className="space-y-6">
        {cart.map((item) => {
          const price = getPriceForQuantity(item.pricing, item.quantity);

          return (
            <div
              key={item._id}
              className="flex gap-6 bg-white p-4 rounded-xl shadow"
            >
              <img
                src={`http://localhost:4000${item.image}`}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>

                <p>Price: Rs. {price}</p>

                <p>Quantity: {item.quantity}</p>

                <p className="font-bold">Total: Rs. {price * item.quantity}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">Total: Rs. {total}</h2>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
