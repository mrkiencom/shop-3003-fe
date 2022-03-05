import "../css/header.css";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { FaUserAlt } from "react-icons/fa";
export default function Header(props) {
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { item, onAdd, userName } = props;
  const listOrder = item;
  const [showNavUser, setShowNavUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const clearOrder = (id) => {
    const list = listOrder.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("listOrder", JSON.stringify(list));
    onAdd();
  };
  let subTotal = 0;
  if (item.length > 0) {
    for (let i = 0; i < item.length; i++) {
      subTotal += item[i].price * item[i].quantityOrder;
    }
  }

  return (
    <div class="main-header">
      <div class="contain-header">
        <div class="contain-header-row">
          <div class="header-row-left row">
            <div class="logo-header">
              <a href="/">
                <img src="/img/fresh-meats-logo.png" id="logo"></img>
              </a>
            </div>
          </div>
          <div class="header-row-middler row">
            <ul class="list-content row">
              <li class="row">
                <a onClick={(e) => setShow(!show)} href="#">
                  Our Types
                </a>
              </li>
              <li class="row">Subscription</li>
              <li class="row">Blog</li>
              <li class="row">About</li>
            </ul>
          </div>
          <div class="header-row-right row">
            <ul class="list-header-right">
              <li class="card-text">
                <Link to="//" onClick={() => setShowCard(true)}>
                  <MdOutlineLocalGroceryStore size="30" />
                  {` Card / ${item.length ? item.length : 0} items`}
                </Link>
              </li>
              <li class="login-text">
                {!token ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <div>
                    <Link
                      to="#"
                      id="user-icon"
                      onClick={() => setShowNavUser(!showNavUser)}
                    >
                      <FaUserAlt />
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {show && (
        <div
          onMouseMove={(e) => {
            if (e.pageY < 70 || e.pageY > 217) {
              setShow(false);
            }
          }}
          onMouseOut={(e) => {
            if (e.pageY < 70 || e.pageY > 217) {
              setShow(false);
            }
          }}
          onMouse
          class="show-category-header"
        >
          <div id="img-box-show-link">
            <a href="/categorys/Chicken" id="img-box-show-link">
              <img src="/img/meat-1.jpg"></img>
            </a>
          </div>
          <div id="img-box-show-link">
            <a href="/categorys/Beef" id="img-box-show-link">
              <img src="/img/meat-2.jpg"></img>
            </a>
          </div>
          <div id="img-box-show-link">
            <a href="/categorys/Lamb" id="img-box-show-link">
              <img src="/img/meat-3.jpg"></img>
            </a>
          </div>
          <div id="img-box-show-link">
            <a href="/categorys/SeaFoods" id="img-box-show-link">
              <img src="/img/meat-4.jpg"></img>
            </a>
          </div>{" "}
          <div id="img-box-show-link">
            <a href="/categorys/Pork" id="img-box-show-link">
              <img src="/img/meat-5.jpg"></img>
            </a>
          </div>
          <div id="img-box-show-link">
            <a href="/categorys/SmallGoods" id="img-box-show-link">
              <img src="/img/meat-6.jpg"></img>
            </a>
          </div>
        </div>
      )}
      {showCard && (
        <div id="background">
          <div class="show-card">
            <div id="x312d">
              <div id="btn-1">
                <button
                  onClick={() => setShowCard(false)}
                  class="clear-show-card"
                >
                  <Link to="//">x</Link>
                </button>
                <div class="card-name">Card</div>
              </div>
            </div>
            <b></b>
            <div id="show-order-box-main">
              {listOrder.map((order) => {
                return (
                  <div class="order-box">
                    <div class="box-image-order">
                      <img src={order.avartaUrl}></img>
                    </div>
                    <div class="info-order">
                      <div>{order.name}</div>
                      <div class="price">
                        <p id="quantity">{order.quantityOrder} x </p>
                        <p id="price"> {order.price}k</p>
                      </div>
                    </div>
                    <div class="clear-order-box">
                      <button
                        class="clear-order-box-btn"
                        onClick={() => clearOrder(order.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {item.length > 0 && (
              <div class="payload">
                <div class="total-price">
                  <p id="text-subtotal">Subtotal:</p>

                  <p id="subtotal">
                    <CurrencyFormat
                      value={subTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    đ
                  </p>
                </div>
                <div class="payload-btn">
                  {!token ? (
                    <a href="/login" id="pay-load-login-btn">
                      Login
                    </a>
                  ) : (
                    <a href="/cart" id="payload-btn">
                      View Cart
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showNavUser && (
        <div class="user-select">
          <div class="main-user-select row-icon-user">
            <div id="row-a">
              <FaUserAlt />
            </div>
            <div id="row-u">{userName}</div>
          </div>
          <div class="main-user-select">
            <a class="main-user-select" href="/user/profile">
              Thông tin cá nhân
            </a>
          </div>
          <div class="main-user-select">
            <a class="main-user-select" href="/user/history">
              Lịch sử đặt hàng
            </a>
          </div>
          <div class="main-user-select">
            <a class="main-user-select" href="/user/change-password">
              Thay đổi mật khẩu
            </a>
          </div>
          <div class="main-user-select">
            <a
              class="main-user-select"
              href="/"
              onClick={() => localStorage.removeItem("token")}
            >
              Đăng xuất
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
