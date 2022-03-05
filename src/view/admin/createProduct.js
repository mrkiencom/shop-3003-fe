import { useEffect, useState } from "react";
import { GetApi } from "../../api/get-api";
import { storage } from "../uploadImage";
import { PostApi } from "../../api/post-api";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Link } from "react-router-dom";
export default function CreateProduct(props) {
  const { setShow, getAllProduct } = props;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categorys, setCategorys] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    GetApi(token, "categorys/get-all")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((error) => console.log(error.response));
  }, []);

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const upLoadImage = () => {
    setErr([]);
    if (!image) {
      setErr(["image does not Empty"]);
      return;
    }
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log("a");
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const product = {
            code,
            name,
            price: Number(price),
            quantity: Number(quantity),
            type,
            description,
            avartaUrl: url,
            categoryId,
          };
          PostApi(token, product, "brands/create-brand")
            .then((res) => {
              console.log(res);
              getAllProduct();
              setShow("");
            })
            .catch((err) => {
              console.log(err.response.data.message);
              setErr([err.response.data.message]);
            });
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
      <h1>Create Product</h1>
      <div class="main-box-product">
        <div>
          <label>Code</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

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

          <select onChange={(e) => setType(e.target.value)}>
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

          <select onChange={(e) => setCategoryId(e.target.value)}>
            <option>Categorys</option>

            {categorys.length > 0 &&
              categorys.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
          </select>
        </div>
        <button id="btn-add" onClick={() => upLoadImage()}>
          Create
        </button>
      </div>
      {err.length !== 0 && (
        <div id="show-error">
          {err.map((err) => {
            return <div>*{err}</div>;
          })}
        </div>
      )}
    </div>
  );
}
