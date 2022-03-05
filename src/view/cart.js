import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import "../css/cart.css";
import { PostApi } from "../api/post-api";
import ReactLoading from "react-loading";
import listAddress from "../city-api.json";
export default function Cart(props) {
  const [showCheckout, setShowCheckOut] = useState(true);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [load, setLoad] = useState(false);
  const { item } = props;
  const [sc, setSc] = useState(false);
  const [error, setError] = useState("");
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [xa, setXa] = useState("");
  const [soNha, setSoNha] = useState("");

  let subTotal = 0;
  for (let i = 0; i < item.length; i++) {
    subTotal += item[i].price * item[i].quantityOrder;
  }

  const orderCart = () => {
    setLoad(true);
    if (!address) {
      setLoad(false);
      setError("address does not empty");
    }
    if (!tinh) {
      setError("Mời nhập tỉnh thành");
      setLoad(false);
    }
    if (!huyen) {
      setError("Mời nhập huyện");
      setLoad(false);
    }
    if (xa) {
      setError("Mời nhập xã");
      setLoad(false);
    }
    if (soNha) {
      setError("Mời nhập số nhà, số đường");
      setLoad(false);
    }
    const list = {};
    const orders = [];
    item.forEach((item) => {
      const orderItem = {
        productId: item.id,
        quantity: item.quantityOrder,
        price: item.quantityOrder * item.price,
      };
      orders.push(orderItem);
    });
    list.address = `${soNha},${listAddress[tinh].districts[huyen].wards[xa].name},${listAddress[tinh].districts[huyen].name},${listAddress[tinh].name}`;
    list.phone = phone;
    list.orders = orders;
    PostApi("", list, "orders/create")
      .then((res) => {
        console.log(res);
        setLoad(false);
        setSc(false);
        localStorage.removeItem("listOrder");
        setError("");
      })
      .catch((err) => {
        console.log(err.response);
        setLoad(false);
        setError(err.response.message);
      });
  };
  const createAddress = () => {
    const t = tinh ? `,${listAddress[tinh].name}` : "";
    const h = huyen ? `,${listAddress[tinh].districts[huyen].name}` : "";
    const x = xa ? `${listAddress[tinh].districts[huyen].wards[xa].name}` : "";
    let adr = `${soNha}${x}${h}${t}`;
    setAddress(adr);
  };
  return (
    <div class="main-cart">
      {showCheckout ? (
        <div>
          <div class="box-logo">
            <img src="/img/fresh-meats-logo.png"></img>
          </div>
          <div id="title-cart">
            <h2>Cart</h2>
          </div>
          <div class="content-cart">
            <div class="show-propty-product">
              <ul class="ul-propry-product">
                <li id="product-row">Product</li>
                <li id="row">Price</li>
                <li id="row">Quantity</li>
                <li id="row">Subtotal</li>
              </ul>
            </div>
            <div class="show-all-product">
              {item.map((it) => {
                return (
                  <div id="show-1">
                    <ul class="ul-propry-product">
                      <li id="product-row" class="text-red">
                        <img src={it.avartaUrl}></img>
                        {it.name}
                      </li>
                      <li id="row" class="price">
                        <CurrencyFormat
                          value={it.price}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        đ
                      </li>
                      <li id="row">{it.quantityOrder}</li>
                      <li id="row" class="price">
                        <CurrencyFormat
                          value={it.price * it.quantityOrder}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        đ
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
            <div class="add-payload">
              <div id="btn-22">
                <button class="payload-btn-1">
                  <Link
                    to="//"
                    onClick={() => {
                      setShowCheckOut(false);
                      setSc(true);
                    }}
                  >
                    Checkout
                  </Link>
                </button>
              </div>
              <div id="subtotal-red">
                <CurrencyFormat
                  value={subTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                đ
              </div>
            </div>
          </div>
        </div>
      ) : sc ? (
        <div>
          <div class="box-logo">
            <img src="/img/fresh-meats-logo.png"></img>
          </div>
          <div id="title-cart">
            <h2>Check Out</h2>
          </div>
          <div id="checkout-info">
            <div id="bgr-checkout">
              <span>Address</span>
              <div>
                <select
                  onChange={(e) => {
                    setTinh(e.target.value);
                    setHuyen();
                    setXa();
                  }}
                >
                  <option selected disabled>
                    Tỉnh
                  </option>
                  {listAddress.map((city, index) => {
                    return <option value={index}>{city.name}</option>;
                  })}
                </select>
                <select
                  onChange={(e) => {
                    setHuyen(e.target.value);
                    setXa();
                  }}
                >
                  <option selected disabled>
                    Huyện
                  </option>

                  {tinh &&
                    listAddress[tinh].districts.map((dis, index) => {
                      return <option value={index}>{dis.name}</option>;
                    })}
                </select>
                <select
                  onChange={(e) => {
                    setXa(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Xã
                  </option>
                  {huyen &&
                    listAddress[tinh].districts[huyen].wards.map(
                      (war, index) => {
                        return <option value={index}>{war.name}</option>;
                      }
                    )}
                </select>

                <input
                  id="info-checkout-row"
                  value={soNha}
                  placeholder="Số nhà, địa chỉ đường"
                  onChange={(e) => setSoNha(e.target.value)}
                ></input>
              </div>
            </div>
            <div id="bgr-checkout">
              <span>Phone</span>
              <input
                id="info-checkout-row"
                value={phone}
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
          </div>
          <div id="subtitle-checkout">
            <span>Subtitle</span>
            <div id="subtotal-red">
              <CurrencyFormat
                value={subTotal}
                displayType={"text"}
                thousandSeparator={true}
              />
              đ
            </div>
          </div>
          <div id="subtitle-checkout">
            <span>Shipping</span>
            <div id="subtotal-red">
              +
              <CurrencyFormat
                value={30000}
                displayType={"text"}
                thousandSeparator={true}
              />
              đ
            </div>
          </div>
          <div id="subtitle-checkout">
            <div id="b-line">
              <span>Total</span>
              <div id="subtotal-red">
                <CurrencyFormat
                  value={30000 + subTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                đ
              </div>
            </div>
          </div>

          <div class="order-btn-checkout">
            <div id="btn-22">
              <button class="payload-btn-1" onClick={() => orderCart()}>
                {load ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={"20%"}
                    width={"20%"}
                    id="a-input-login"
                  />
                ) : (
                  <Link to="//">Order</Link>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div class="order-btn-checkout">
          <h1>Order successfully</h1>
          <h2>
            <a href="/">Home</a>
          </h2>
        </div>
      )}
      {error && <div id="error-context">{error}</div>}
    </div>
  );
}
