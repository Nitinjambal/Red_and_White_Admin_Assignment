import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import { Toaster } from "react-hot-toast";
import AllProducts from "../pages/AllProducts";
import PrivateRoute from "./PrivateRoute";
import EditProduct from "../pages/EditProduct";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/allProducts"
          element={
            <PrivateRoute>
              <AllProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h3>404 Page Not Found</h3>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default AllRoutes;
