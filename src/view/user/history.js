import { useEffect, useState } from "react";

import { MdDone, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import CurrencyFormat from "react-currency-format";
export default function HistoryOrder(props) {
  const { getListOrderUser, listOrder, confirmOrder, setFiller } = props;

  const [showDetail, setShowDetail] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getListOrderUser();
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
  const filter = ["pending", "deined", "approved"];
  return (
    <div class="main-history-order">
      <div class="fix-layout">
        <h1 id="text-name">Lịch sử đặt hàng</h1>
        <div>
          <select onChange={(e) => setFiller(e.target.value)}>
            <option>Lọc theo trạng thái đơn hàng</option>
            {filter.map((item) => {
              return <option value={item}>Trạng thái: {item}</option>;
            })}
          </select>
        </div>
        <div>
          <ul class="product-list-admin ">
            <li id="sl"> Số lượng</li>
            <li class="fix-1">Address</li>
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
                  <ul class="product-list-admin ">
                    <li id="sl">{index + 1}</li>
                    <li class="fix-1">{list.address}</li>
                    <li id="price-admin">0{list.phone}</li>
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
            <div class="background-order-admin uuu">
              <Link
                to="#"
                onClick={() => setShowDetail("")}
                id="close-btn-order"
                class="history-user-btn"
              >
                X
              </Link>

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
    </div>
  );
}
