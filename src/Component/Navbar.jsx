

import React from 'react'

import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()



  return (
    

  
    <div className="flex items-center justify-between py-3 px-10">
        
    <Button  className="flex items-center gap-1">
    <a href="/">
      <h3 className="text-3xl font-semibold">
        Managing<span className="text-blue-500">Product</span>
      </h3>
    </a>
    </Button>

    


  
      <Button type="submit" onClick={() => navigate('/loginForm')} className="bg-black text-white rounded-none px-4 py-2 ml-2">
        Get Started <IoIosArrowForward />
      </Button>
 
  </div>

  )
};

export default Navbar;
