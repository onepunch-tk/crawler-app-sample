import { Outlet } from "react-router-dom";
import { Navbar } from "@components/navbar";
import { Sidebar } from "@components/sidebar/Sidebar";

export function Root() {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}
