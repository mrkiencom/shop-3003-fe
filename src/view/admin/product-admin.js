import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CreateProduct from "./createProduct";
import "./product-admin.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineCreateNewFolder, MdAddToPhotos } from "react-icons/md";
import UpdateProduct from "./update-product";
import ShowAddQuantity from "./showAddquantity";
export default function Products(props) {
  const [showEditProduct, setShowEditProduct] = useState("");
  const { getAllProduct, listProduct, deleteProduct } = props;
  const [showCreateProduct, setShowProductCreate] = useState(false);
  const [showAddQuantity, setShowAddQuantity] = useState("");
  useEffect(() => {
    getAllProduct();
  }, [showCreateProduct]);
  return (
    <div>
      <h1 id="text-name">Product page</h1>
      <ul class="product-list-admin">
        <li id="code">Code</li>
        <li id="name-avatar">Product</li>
        <li id="description-admin">Description</li>
        <li id="price-admin">Price</li>
        <li id="quantity-admin">Quantity</li>
        <li id="type-admin">Type</li>
        <li id="add-product">
          <Link
            to="#"
            onClick={() => {
              setShowProductCreate(true);
              console.log(showCreateProduct);
            }}
          >
            <MdOutlineCreateNewFolder width="20px" />
          </Link>
        </li>
      </ul>
      {!(showEditProduct || showCreateProduct || showAddQuantity) ? (
        <div class="show-all-product-admin">
          {listProduct.map((product) => {
            return (
              <ul class="product-list-admin">
                <li id="code">{product.code.toUpperCase()}</li>
                <li id="name-avatar">
                  <div id="box-img-admin">
                    <img src={product.avartaUrl}></img>
                  </div>
                  {product.name}
                </li>
                <li id="description-admin">{product.description}</li>
                <li id="price-admin">
                  <CurrencyFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  đ
                </li>
                <li id="quantity-admin">{product.quantity}</li>
                <li id="type-admin">{product.type}</li>
                <li id="icon-button">
                  <Link
                    to="#"
                    id=""
                    onClick={() => setShowAddQuantity(product)}
                  >
                    <MdAddToPhotos />
                  </Link>
                  <Link
                    to="#"
                    id="red"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <RiDeleteBin6Line />
                  </Link>
                  <Link
                    to="#"
                    id="green"
                    onClick={() => setShowEditProduct(product)}
                  >
                    <FiEdit />
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      ) : (
        false
      )}
      {showEditProduct ? (
        <div class="show-edit-product-bg">
          <UpdateProduct
            product={showEditProduct}
            setShow={setShowEditProduct}
            getAllProduct={getAllProduct}
          />
        </div>
      ) : (
        false
      )}
      {showCreateProduct ? (
        <div class="show-edit-product-bg">
          <CreateProduct
            setShow={() => setShowProductCreate(false)}
            getAllProduct={getAllProduct}
          />
        </div>
      ) : (
        false
      )}
      {showAddQuantity ? (
        <div class="show-edit-product-bg">
          <ShowAddQuantity
            setShow={() => setShowAddQuantity("")}
            getAllProduct={getAllProduct}
            product={showAddQuantity}
          />
        </div>
      ) : (
        false
      )}
    </div>
  );
}
