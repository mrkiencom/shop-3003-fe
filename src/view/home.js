import Footer from "./footer";
import Header from "./header";
import Middle from "./middle";
import { Routes, Switch, Route, Link, Outlet } from "react-router-dom";
import Vegetable from "./categorys/category";

export default function home(props) {
  const { onAdd, item, load, subTotal, userName } = props;
  return (
    <div>
      <Header
        onAdd={onAdd}
        item={item}
        load={load}
        subTotal={subTotal}
        userName={userName}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
