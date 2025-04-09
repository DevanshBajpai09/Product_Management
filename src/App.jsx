import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'







import LandingPage from "./Component/LandingPage";
import Navbar from "./Component/Navbar";
import SignupPage from "./Singup/Signup";
import LoginPage from "./Login/login";
import  DashboardRedirect  from "./Component/Route";
import ProtectRoute from "./Component/ProtectRoute";
import ProductDetails from "./Product/ProductDetails";
import ProductForm from "./Product/ProductForm";
import AllProduct from "./Product/AllProduct";
import EditProductForm from "./Product/EditProductForm";



function App() {

  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></> }/>
      
        
        <Route path="/signupForm" element={<SignupPage />} />
        <Route path="/loginForm" element={<LoginPage />} />

        

        <Route element={<ProtectRoute />}>
        
        <Route path="/dashboard" element={<DashboardRedirect />}/>
        <Route path="/all-product" element={<AllProduct />} />
        
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<EditProductForm />} />
        </Route>
        
    
        
      </Routes>
    </Router>
    </>
  )
}

export default App
