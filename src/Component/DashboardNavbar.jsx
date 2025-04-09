import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddCircle, IoList } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-10 bg-white shadow-2xl">
      
      <a href="/dashboard" className="flex items-center font-bold text-3xl text-black">
        Managing<span className="text-blue-500">Products</span>
      </a>

      
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/create-product")}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-md"
        >
          <IoAddCircle size={18} />
          Create Product
        </Button>

        <Button
          onClick={() => navigate("/all-product")}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition px-4 py-2 rounded-md"
        >
          <IoList size={18} />
          Show Products
        </Button>
      </div>

      
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-all"
        >
          Logout <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
