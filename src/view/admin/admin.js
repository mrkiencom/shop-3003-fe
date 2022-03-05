import { Link, Route, Routes, Outlet } from "react-router-dom";
import Account from "./account-admin";
import Categories from "./category-admin";
import CreateCategory from "./createCategory";
import CreateProduct from "./createProduct";
import Orders from "./order-admin";
import Products from "./product-admin";
import "./admin.css";
export default function admin() {
  return (
    <div class="main-admin">
      <div class="nav-link-page">
        <h1>Admin</h1>
        <Link to="products">Products</Link>
        <Link to="categories">Categories</Link>
        <Link to="orders">Orders</Link>
        <Link to="account">Accounts</Link>
        <Link to="statistic">Statistic</Link>
      </div>

      <div class="contant-admin-page">
        <div class="background-view-admin">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
