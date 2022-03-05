import { useEffect, useState } from "react";
import "../../css/vegetable.css";
import { GetApi } from "../../api/get-api";
import { Outlet, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ShowProduct from "./show-product";
import { axios } from "axios";

export default function Category(props) {
  const [categorys, setCategorys] = useState([]);
  const [showCategoryName, setShowCategoryName] = useState("");
  const [propCategory, setPropCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [propProduct, setPropProduct] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [listProductByCategory, setListProductByCategory] = useState([]);
  const param = useParams("name");
  console.log(param);
  const handleShowDetail = (i) => {
    setShowDetail(true);
    setPropProduct(i);
  };

  const { handleAddCount } = props;

  const token = localStorage.getItem("token");
  useEffect(async () => {
    await GetApi(token, "categorys/get-all")
      .then((res) => {
        setCategorys(res.data);
        getCategoryByName(res.data);
      })
      .catch((error) => console.log(error.response));
    handleCount();
  }, []);

  const getCategoryByName = (list) => {
    if (!param) return;
    const category = list.find((item) => {
      return item.name === param.name;
    });

    return getProductByCategoryId(category.id);
  };

  const handleClick = (e, category) => {
    setShowCategoryName(e.target.innerText.toUpperCase());
    setPropCategory(category);
    setShowDetail(false);
    getProductByCategoryId(category.id);
    handleCount();
  };

  const handleCount = () => {
    let list = [];
    for (let i = 0; i < 100; i++) {
      list[i] = 1;
    }
    handleAddCount(list);
  };

  const getProductByCategoryId = (categoryId) => {
    GetApi(token, `brands/by-category/${categoryId}`)
      .then((res) => {
        console.log(res.data);
        setListProduct(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div class="main-middle">
      <div class="main-types">
        <div class="image-types">
          <img id="image-types" src="/img/vegetable-types.png"></img>
        </div>
        <div class="main-content">
          <div class="nav-bar-category">
            <ul class="list-category">
              {categorys &&
                categorys.map((category) => {
                  return (
                    <Link to={category.name} class="a-category-name">
                      <li
                        onClick={(e) => handleClick(e, category)}
                        class="li-category-name"
                      >
                        {category.name}
                      </li>
                    </Link>
                  );
                })}
            </ul>
            <h2 class="name-category">
              <b></b>
              <span>{param.name}</span>
              <b></b>
            </h2>
          </div>
          <Outlet context={listProduct} />
        </div>
      </div>
    </div>
  );
}
