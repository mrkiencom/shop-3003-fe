import { Outlet, useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";
import "./show-product.css";
import { useEffect, useState } from "react";
import { GetApi } from "../../api/get-api";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
export default function ShowProduct(props) {
  const [propCategory, propShowDetail] = useOutletContext();
  const [showDetail, setShowDetail] = useState(false);
  const listProductByCategory = useOutletContext();
  const [propProduct, setPropProduct] = useState();
  const [quantityOrder, setQuantityOrder] = useState([]);
  const [st, setSt] = useState(false);
  console.log(listProductByCategory);
  const handleShowDetail = (i) => {
    setShowDetail(true);
    setPropProduct(i);
  };

  useEffect(() => {
    console.log("x");
  }, []);
  const shortProduct = (type) => {
    listProductByCategory.sort(function (a, b) {
      return type === "low" ? a.price - b.price : b.price - a.price;
    });
    setSt(!st);
  };
  const { onAdd, subCount, addCount, count } = props;
  console.log(count);
  const addToCard = (product, i) => {
    let oldItems = JSON.parse(localStorage.getItem("listOrder")) || [];
    oldItems = oldItems.filter((element) => {
      return element.id !== product.id;
    });
    product.quantityOrder = i;
    oldItems.push(product);
    localStorage.setItem("listOrder", JSON.stringify(oldItems));
    onAdd();
  };
  const param = useParams("name");

  return (
    <div class="show-category">
      <div id="filter-product">
        <select onChange={(e) => shortProduct(e.target.value)}>
          <option value="">Shorting</option>
          <option value="low">Short by price: low to hight</option>
          <option value="hight">Short by price: hight to low</option>
        </select>
      </div>
      {!param.id && (
        <ul class="list-show-product">
          {listProductByCategory.map((product, i) => {
            return (
              <li class="product-box">
                <div class="product-img-box">
                  <Link
                    class="product-img-box"
                    to={product.id}
                    onClick={(e) => handleShowDetail(product)}
                  >
                    <img id="img-box" src={product.avartaUrl}></img>
                  </Link>
                </div>
                <div class="product-box-text">
                  <div class="title-product">
                    <p class="title">
                      <Link
                        id="i"
                        to={product.id}
                        onClick={(e) => handleShowDetail(product)}
                      >
                        {product.name}
                      </Link>
                    </p>
                  </div>
                  <div class="price-product">
                    <CurrencyFormat
                      value={product.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    đ
                  </div>
                  <div class="cart-box">
                    <div class="quantity">
                      <button
                        onClick={(e) => {
                          if (count[i] > 1) subCount(i);
                        }}
                      >
                        -
                      </button>

                      <button disabled>{count[i] ? count[i] : 1}</button>

                      <button
                        onClick={(e) => {
                          if (count[i] < product.quantity) addCount(i);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={(e) => addToCard(product, count[i])}
                      class="add-to-card-btn"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {<Outlet context={1} />}
    </div>
  );
}
