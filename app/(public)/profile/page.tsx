"use client";

import { useEffect, useRef, useState } from "react";
import {
  getProfileAPI,
  getMyOrdersAPI,
  deleteOrderAPI,
  updateProfileAPI,
  uploadProfileImageAPI,
} from "@/lib/api/profile";

interface User {
  _id?: string;
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
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
    loadOrders();
  }, []);

  /* ================= LOAD PROFILE ================= */

  const loadProfile = async () => {
    try {
      const data = await getProfileAPI();

      setUser({
        _id: data._id,
        fullName: data.fullName,
        email: data.email,
        profileImage: data.profileImage,
      });

      setFullName(data.fullName);
      setEmail(data.email);

      // save id for update
      setUser((prev) => ({
        ...prev,
        ...data,
        _id: data._id || data.userId || data.id,
      }));
    } catch {
      window.location.href = "/login";
    }
  };

  /* ================= LOAD ORDERS ================= */

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

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /* ================= DELETE ORDER ================= */

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order?")) return;

    await deleteOrderAPI(orderId);

    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  };

  /* ================= IMAGE CLICK ================= */

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    const res = await uploadProfileImageAPI(file);

    setUser((prev) => ({
      ...prev!,
      profileImage: res.profileImage,
    }));
  };

  /* ================= UPDATE PROFILE ================= */

  const handleUpdateProfile = async () => {
    if (!user?._id) {
      alert("User ID missing");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", fullName);

    const updated = await updateProfileAPI(user._id, formData);

    setUser(updated);

    setEditMode(false);

    alert("Profile updated");
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex justify-between">
        <div className="flex gap-6 items-center">
          {/* IMAGE */}
          <div className="relative">
            <img
              onClick={handleImageClick}
              src={
                user.profileImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`
                  : "/user.png"
              }
              className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover cursor-pointer hover:opacity-80"
            />

            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          {/* INFO */}
          <div>
            {editMode ? (
              <>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border px-3 py-2 rounded w-full mb-2"
                />

                <input
                  value={email}
                  disabled
                  className="border px-3 py-2 rounded w-full"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>

                <p className="text-gray-500">{user.email}</p>
              </>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-2">
          {editMode ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ORDERS */}

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {loadingOrders
          ? "Loading..."
          : orders.map((order) => (
              <div key={order._id} className="border p-4 rounded mb-4">
                {/* HEADER */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-bold">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      Rs. {order.total}
                    </p>

                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center border-t pt-3"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-blue-600">
                        Rs. {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
