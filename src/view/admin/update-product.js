import { useEffect, useState } from "react";
import { GetApi } from "../../api/get-api";
import { storage } from "../uploadImage";
import { PatchApi, PostApi } from "../../api/post-api";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Link } from "react-router-dom";
export default function UpdateProduct(props) {
  const { product, setShow, getAllProduct } = props;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categorys, setCategorys] = useState([]);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [type, setType] = useState(product.type);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState(product.category.name);

  useEffect(() => {
    GetApi(token, "categorys/get-all")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((error) => console.log(error.response));
  }, []);
  //   useEffect(() => {
  //     setName(product.name);
  //     setPrice(product.price);
  //     setQuantity(product.quantity);
  //     setType(product.type);
  //     setDescription(product.description);
  //   }, [product]);
  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };
  console.log(product);
  const upLoadImage = () => {
    if (!image) return;
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const productBody = {
            name,
            price: Number(price),
            quantity: Number(quantity),
            type,
            description,
            avartaUrl: url,
            categoryId,
          };

          PatchApi(token, productBody, `brands/update-brand/${product.id}`)
            .then((res) => console.log(res))
            .catch((error) => console.log(error.response));

          setShow("");
          getAllProduct();
        });
      }
    );
  };

  const typeText = ["vegetable", "meat", "seafood"];
  console.log(
    name,
    typeof price,
    quantity,
    type,
    description,
    image,
    typeof categoryId
  );
  return (
    <div class="main-create-product">
      <h1 id="close-btn">
        <Link to="#" onClick={() => setShow("")}>
          X
        </Link>
      </h1>
      <h1>Edit Product</h1>
      <div class="main-box-product">
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price</label>

          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Quantity</label>

          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Type</label>

          <select onChange={(e) => setType(e.target.value)} value={type}>
            <option>Types</option>
            {typeText.map((type) => {
              return <option value={type}>{type}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Description</label>

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>

          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(image);
            }}
          />
        </div>

        <div>
          <label>Category</label>

          <select
            onChange={(e) => {
              setCategoryId(e.target.value);
              setCategory(e.innerText);
            }}
            value={category}
          >
            <option>Categorys</option>

            {categorys.length > 0 &&
              categorys.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
          </select>
        </div>
        <button id="btn-add" onClick={upLoadImage}>
          Edit
        </button>
      </div>
    </div>
  );
}
