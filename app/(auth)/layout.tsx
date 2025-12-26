import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-blue-300 p-8 w-[400px] rounded">
        <h1 className="text-xl font-bold text-center mb-4">WELCOME</h1>
        {children}
      </div>
    </div>
  );
}
