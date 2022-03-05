import { useEffect, useState } from "react";

import { MdDone, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import "./order.css";
import { BiShow } from "react-icons/bi";
import CurrencyFormat from "react-currency-format";
export default function Orders(props) {
  const { listOrder, getOrder, confirmOrder } = props;
  const [showDetail, setShowDetail] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getOrder();
  }, []);
  console.log(listOrder);

  const showDetailOrder = (index) => {
    setShowDetail(listOrder[index].orders);
    let totalP = 0;
    listOrder[index].orders.forEach((order) => {
      totalP += order.price;
    });
    setTotal(totalP);
    console.log(total);
  };
  return (
    <div>
      <h1 id="text-name">Order page</h1>
      <div>
        <ul class="product-list-admin">
          <li id="name-avatar"> User Order</li>
          <li id="description-admin">Address</li>
          <li id="price-admin">Phone</li>
          <li id="type-admin">Order at</li>
          <li id="type-admin">status</li>
        </ul>
      </div>
      {!showDetail ? (
        listOrder && (
          <div>
            {listOrder.map((list, index) => {
              return (
                <ul class="product-list-admin">
                  <li id="name-avatar">{list.user ? list.user.name : null}</li>
                  <li id="description-admin">{list.address}</li>
                  <li id="price-admin">{list.phone}</li>
                  <li id="type-admin">{list.createAt}</li>
                  <li
                    id="type-admin"
                    class={
                      list.status === "pending"
                        ? "color-red"
                        : list.status === "approved"
                        ? "color-green"
                        : list.status === "done"
                        ? "color-blue"
                        : false
                    }
                  >
                    {list.status}
                  </li>
                  <div id="button-order-admin">
                    <Link
                      to="##"
                      id="asd"
                      onClick={() => showDetailOrder(index)}
                    >
                      <BiShow />
                    </Link>
                    {list.status === "pending" && (
                      <Link
                        to="#"
                        id="approved"
                        onClick={() => confirmOrder("approve", list.id)}
                      >
                        <MdDone />
                      </Link>
                    )}
                    {list.status === "approved" && (
                      <Link
                        to="#"
                        id="done"
                        onClick={() => confirmOrder("done", list.id)}
                      >
                        <MdDone />
                      </Link>
                    )}
                    {list.status === "pending" && (
                      <Link
                        to="#"
                        id="deneid"
                        onClick={() => confirmOrder("denial", list.id)}
                      >
                        <MdOutlineClose />
                      </Link>
                    )}
                  </div>
                </ul>
              );
            })}
          </div>
        )
      ) : (
        <div class="show-edit-product-bg">
          <div class="background-order-admin">
            <Link to="#" onClick={() => setShowDetail("")} id="close-btn-order">
              X
            </Link>
            <h1>Detail</h1>
            <div class="show-propty-product">
              <ul class="ul-propry-product">
                <li id="product-row">Product</li>
                <li id="row">Price</li>
                <li id="row">Quantity</li>
                <li id="row">Subtotal</li>
                <li id="disable">ss</li>
              </ul>
            </div>
            <div class="show-all-product xxx">
              {showDetail.map((it) => {
                return (
                  <div id="show-1">
                    <ul class="ul-propry-product">
                      <li id="product-row" class="text-red">
                        <img src={it.product.avartaUrl}></img>
                        {it.product.name}
                      </li>
                      <li id="row" class="price">
                        <CurrencyFormat
                          value={it.product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        đ
                      </li>
                      <li id="row">{it.quantity}</li>
                      <li id="row" class="price">
                        <CurrencyFormat
                          value={it.price}
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
            <div class="total">
              <h1>Total</h1>
              <div id="total-price-detail-admin">
                <CurrencyFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                đ
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
