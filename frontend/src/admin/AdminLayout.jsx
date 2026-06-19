import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
