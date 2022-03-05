import { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import "./show-detail-product.css";
import { GetApi } from "../../api/get-api";
import CurrencyFormat from "react-currency-format";
export default function ProductDetailView(props) {
  const param = useParams("id");
  const param2 = useParams("name");
  const countOrder = useOutletContext();
  const [count, setCount] = useState(1);
  console.log(param2);
  const [product, setProduct] = useState();
  useEffect(() => {
    GetApi(localStorage.getItem("token"), `brands/${param.id}`)
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error.response));

    setCount(1);
  }, []);
  const { onAdd } = props;

  const handleAddCard = () => {
    let oldItems = JSON.parse(localStorage.getItem("listOrder")) || [];
    oldItems = oldItems.filter((element) => {
      return element.id !== product.id;
    });
    product.quantityOrder = count;
    oldItems.push(product);
    localStorage.setItem("listOrder", JSON.stringify(oldItems));
    onAdd();
  };

  return (
    <div>
      {product && (
        <div class="main-show-detail-product">
          <div class="content-show-detail-product">
            <div class="image-box-detail">
              <img src={product.avartaUrl}></img>
            </div>
            <div class="content-info">
              <div id="name-product">
                <span>{product.name}</span>
              </div>

              <div id="info-product">
                <label id="label-text">Price </label>
                <span id="price">
                  {" "}
                  <CurrencyFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  đ
                </span>
              </div>
              <b></b>
              <div id="info-product">
                <label id="label-text">Quantity </label>
                <span>{product.quantity}</span>
              </div>
              <b></b>
              <div id="info-product">
                <label id="label-text">Type </label>
                <span>{product.type}</span>
              </div>
              <b></b>
              <div class="box-card-detail">
                <div class="count-box">
                  <button
                    onClick={() => {
                      if (count > 1) setCount(count - 1);
                    }}
                  >
                    -
                  </button>

                  <button disabled>{count}</button>

                  <button
                    onClick={() => {
                      if (count < product.quantity) setCount(count + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button class="add-to-card-btn" onClick={() => handleAddCard()}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
