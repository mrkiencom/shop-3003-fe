import "./App.css";
import Home from "./view/home";
import { Routes, Route, Link } from "react-router-dom";
import Admin from "./view/admin/admin";
import Login from "./view/auth/login";
import Middle from "./view/middle";
import ShowProduct from "./view/categorys/show-product";
import ProductDetailView from "./view/categorys/show-product-detail";
import Category from "./view/categorys/category";
import { useEffect, useState } from "react";
import Cart from "./view/cart";
import Products from "./view/admin/product-admin";
import Categories from "./view/admin/category-admin";
import Orders from "./view/admin/order-admin";
import Account from "./view/admin/account-admin";
import Statistic from "./view/admin/statistic";
import { GetApi } from "./api/get-api";
import { deleteApi } from "./api/delete-api";
import { PostApi } from "./api/post-api";
import User from "./view/user/profile";
import HistoryOrder from "./view/user/history";
import ChangePw from "./view/user/change-pass";
function App() {
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("listOrder")) || []
  );
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [count, setCount] = useState([]);
  const [load, setLoad] = useState(true);
  const [listProduct, setListProduct] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [userName, setUserName] = useState();
  const [listOrderUser, setListOrderUser] = useState();
  useEffect(() => {
    token &&
      GetApi("", "users/getme")
        .then((res) => {
          console.log(res.data);
          setUserName(res.data.name);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
  }, [token]);

  const onAdd = async () => {
    await setItem(JSON.parse(localStorage.getItem("listOrder")));
    setLoad(!load);
    console.log(item);
  };

  const addCount = (i) => {
    const arr = count;
    arr[i]++;
    setCount([...arr]);
  };

  const handleAddCount = (arr) => {
    console.log(arr);
    setCount([...arr]);
  };

  const subCount = (i) => {
    console.log("k");
    const arr = count;
    arr[i]--;
    setCount([...arr]);
  };
  const getAllProduct = () => {
    GetApi("", "brands")
      .then((res) => {
        setListProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };
  const deleteProduct = (id) => {
    deleteApi(token, "brands", id)
      .then((res) => getAllProduct())
      .catch((err) => console.log(err.response.message));
  };
  const getOrder = async () => {
    await GetApi("", "orders")
      .then((res) => {
        console.log(res);
        setListOrder(res.data);
      })
      .catch((err) => console.log(err.response.message));
  };
  const confirmOrder = (host, listOrderId) => {
    PostApi("", { listOrderId }, `orders/${host}`)
      .then((res) => {
        getOrder();
        getListOrderUser();
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  const getListOrderUser = () => {
    GetApi("", "orders/by-user")
      .then((res) => {
        console.log(res.data);
        setListOrderUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const setFiller = async (value) => {
    if (value === "all") {
      getListOrderUser();
    } else {
      GetApi("", "orders/by-user")
        .then((res) => {
          console.log(res.data);
          setListOrderUser(
            res.data.filter((res) => {
              return res.status === value;
            })
          );
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home onAdd={onAdd} item={item} load={load} userName={userName} />
          }
        >
          <Route path="" element={<Middle />}></Route>
          <Route path="user/profile" element={<User />} />
          <Route path="user/change-password" element={<ChangePw />} />

          <Route
            path="user/history"
            element={
              <HistoryOrder
                getListOrderUser={getListOrderUser}
                listOrder={listOrderUser}
                confirmOrder={confirmOrder}
                setFiller={setFiller}
              />
            }
          />

          <Route path="login" element={<Login />} />

          <Route
            path="categorys"
            element={<Category handleAddCount={handleAddCount} />}
          >
            <Route
              path=":name"
              element={
                <ShowProduct
                  onAdd={onAdd}
                  subCount={subCount}
                  addCount={addCount}
                  count={count}
                />
              }
            >
              <Route
                path=":id"
                element={
                  <ProductDetailView
                    onAdd={onAdd}
                    subCount={subCount}
                    addCount={addCount}
                    count={count}
                  />
                }
              />
            </Route>
          </Route>
        </Route>
        <Route path="cart" element={<Cart item={item} />} />
        <Route path="admin" element={<Admin />}>
          <Route
            path="products"
            element={
              <Products
                getAllProduct={getAllProduct}
                listProduct={listProduct}
                deleteProduct={deleteProduct}
              />
            }
          />
          <Route path="categories" element={<Categories />} />
          <Route
            path="orders"
            element={
              <Orders
                confirmOrder={confirmOrder}
                getOrder={getOrder}
                listOrder={listOrder}
              />
            }
          />
          <Route path="account" element={<Account />} />
          <Route path="statistic" element={<Statistic />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
