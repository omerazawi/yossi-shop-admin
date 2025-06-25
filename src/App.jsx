import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Products from './Pages/Products/Products';
import Shipping from './Pages/Shipping/Shipping';
import Users from './Pages/Users/Users';
import Menu from './components/Menu/Menu';
import Loading from "./components/Loading/Loading";
import { GlobalContext, GlobalProvider } from "./Context/GlobalContext";
import PopUp from "./components/PopUp/PopUp";
import ManageCategory from "./components/ManageCategory/ManageCategory";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import { ProductProvider } from "./Context/ProductContext";
import AdminOrders from "./Pages/AdminOrders/AdminOrders";

function AppRoutes() {
  const location = useLocation();
  const hideMenuOnRoutes = ['/categorys'];
  const { isLoading, message, confirmDialog } = useContext(GlobalContext);

  return (
    <>
      {(message || confirmDialog.isOpen) && <PopUp />}
      {!hideMenuOnRoutes.includes(location.pathname) && <Menu />}
      {!isLoading ? (
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/categorys" element={<PrivateRoute><ManageCategory /></PrivateRoute>} />
          <Route path="/addproducts" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/Orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />

        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
    <GlobalProvider>
      <ProductProvider>
      <AppRoutes />
      </ProductProvider>
    </GlobalProvider>
    </Router>
  );
}
