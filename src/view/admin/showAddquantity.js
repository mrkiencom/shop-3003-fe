import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PatchApi } from "../../api/post-api";
import ReactLoading from "react-loading";
export default function ShowAddQuantity(props) {
  const [quantity, setQuantity] = useState();
  const { setShow, getAllProduct, product } = props;
  const [load, setLoad] = useState(false);
  const addQuantity = () => {
    setLoad(true);
    const newProduct = {
      name: product.name,
      code: product.code,
      price: product.price,
      quantity: product.quantity + Number(quantity),
      type: product.type,
      description: product.description,
      avartaUrl: product.avartaUrl,
      categoryId: product.category.id,
    };
    PatchApi("", newProduct, `brands/update-brand/${product.id}`)
      .then((res) => {
        getAllProduct();
        setLoad(false);
        setShow("");
      })
      .catch((err) => {
        console.log(err.response.message);
        setLoad(false);
      });
  };
  console.log(product);
  return (
    <div class="main-create-product">
      <h1 id="close-btn">
        <Link to="#" onClick={() => setShow("")}>
          X
        </Link>
      </h1>
      <h1>Thay đổi số lượng sản phẩm</h1>
      <div class="main-box-product">
        <div>
          <label>Số lượng hiện tại</label>
          <input value={product.quantity} type="number" disabled />
        </div>
        <div>
          <label>Tăng thêm / Giảm bớt</label>
          <input
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button id="btn-add" onClick={() => addQuantity()}>
          {!load ? (
            "Add"
          ) : (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={"8%"}
              width={"8%"}
              id="a-input-login"
            />
          )}
        </button>
      </div>
    </div>
  );
}
