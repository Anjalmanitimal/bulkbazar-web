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
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="font-bold text-blue-600">
                  Rs. {order.totalAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
