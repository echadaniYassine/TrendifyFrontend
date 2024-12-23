import React, { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import Orders from "../components/Admin/Orders";
import Products from "../components/Admin/Products";
import Users from "../components/Admin/Users";


const AdminDashboard = () => {

  return (
    <>
    <Dashboard/>
    <Products/>
    <Users/>
    </>
    

  );
};

export default AdminDashboard;
