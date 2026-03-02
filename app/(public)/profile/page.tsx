"use client";

import { useEffect, useState } from "react";
import {
  getProfileAPI,
  getMyOrdersAPI,
  deleteOrderAPI,
} from "@/lib/api/profile";

interface User {
  fullName: string;
  email: string;
  profileImage?: string;
}

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    loadProfile();
    loadOrders();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfileAPI();
      setUser(data);
    } catch {
      window.location.href = "/login";
    }
  };

  const loadOrders = async () => {
    try {
      const data = await getMyOrdersAPI();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleDeleteOrder = async (orderId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    try {
      await deleteOrderAPI(orderId);

      setOrders((prev) => prev.filter((o) => o._id !== orderId));

      alert("Order deleted successfully");
    } catch {
      alert("Failed to delete order");
    }
  };

  if (!user) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* PROFILE CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={
              user.profileImage
                ? `${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`
                : "/user.png"
            }
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.fullName}
            </h2>

            <p className="text-gray-500">{user.email}</p>

            <p className="text-sm text-gray-400 mt-1">Welcome to BulkBazar</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>

      {/* ORDERS SECTION */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>

          <span className="text-sm text-gray-500">{orders.length} Orders</span>
        </div>

        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No orders yet</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                {/* ORDER HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">Order ID</p>

                    <p className="text-sm text-gray-500 break-all">
                      {order._id}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>

                    <p className="font-bold text-green-600 text-xl">
                      Rs. {Number(order.totalAmount || 0).toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="mt-5 space-y-3">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                        className="w-16 h-16 rounded object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>

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
