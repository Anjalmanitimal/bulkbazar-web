"use client";

import { useEffect, useState } from "react";
import { getProfileAPI, getMyOrdersAPI } from "@/lib/api/profile";

interface User {
  fullName: string;
  email: string;
  profileImage?: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  createdAt: string;
  items: any[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadProfile();
    loadOrders();
  }, []);

  const loadProfile = async () => {
    const data = await getProfileAPI();
    setUser(data);
  };

  const loadOrders = async () => {
    const data = await getMyOrdersAPI();
    setOrders(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* PROFILE INFO */}
      <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6">
        <img
          src={
            user.profileImage
              ? `${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`
              : "/user.png"
          }
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>

          <button
            onClick={logout}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MY ORDERS */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-xl p-5 space-y-4">
                {/* Order header */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order ID: {order._id}</p>

                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="font-bold text-green-600 text-lg">
                    Rs. {Number(order.totalAmount || 0).toLocaleString()}
                  </div>
                </div>

                {/* Ordered items */}
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="font-semibold text-blue-600">
                        Rs. {Number(item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
