import React from "react";
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from "./pages/Home/Home";
import BrandsPage from "./pages/BrandList/Brands";
import Good from "./pages/goods/Good";
import Man from "./pages/Man/Man";
import Woman from "./pages/Woman/Woman";
import Page404 from "./pages/404/404";
import Brand from "./pages/Brand/Brand";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Cart from "./pages/Cart/Cart";

const Links = () => {
  return(
    <Routes>
      <Route path="*" element={<Page404 />}/>
      <Route path="/" element={<HomePage />}/>
      <Route path="/brandlist" element={<BrandsPage />}/>
      <Route path="/goods/:id" element={<Good />}/>
      <Route path="/muzhskoe" element={<Man />}/>
      <Route path="/zhenskoe" element={<Woman />}/>
      <Route path="/brands/:brand_name" element={<Brand />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/cart" element={<Cart />}/>
    </Routes>  
  )
}

export default Links