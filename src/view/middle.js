import "../css/middle.css";
import { GiChicken } from "react-icons/gi";
import { Outlet } from "react-router";
export default function middle() {
  return (
    <div class="main-middle">
      <Outlet />
      <div class="image-content">
        <img class="img-home" src="image-home.png"></img>
        <div class="introduce-text">
          <div class="text-content">
            <h1>Smart Gardens for a healthier you.</h1>
            <p>
              Enjoy the benefits of fresh, just-picked produce year-round with
              the help of our self-watering indoor gardens. The magic of plants
              without any of the guess-work.
            </p>
            <button>
              <a href="#">Shop now</a>
            </button>
          </div>
        </div>
      </div>
      <div class="show-content-meat">
        <div class="show-content">
          <div class="text-content-meat">
            <div class="icon-chicken">
              <GiChicken size="50" />
            </div>
            <h1>The Premier Meat & Seafood Provider</h1>
            <p>---</p>
            <p class="intro-text">
              Fresh Meats provides the freshest meat, seafood & meal solutions
              from our retail and online store on the Sunshine Coast. We also
              provide wholesale food service supply to restaurants, clubs,
              schools and other institutions throughout Queensland and northern
              New South Wales.
            </p>
          </div>
        </div>
        <ul class="show-category">
          <li class="box-img">
            <a href="categorys/Chicken">
              <img id="img-category" src="img/meat-1.jpg"></img>
              <h1>Chicken</h1>
            </a>
          </li>
          <li class="box-img">
            <a href="#">
              <img id="img-category" src="img/meat-2.jpg"></img>
              <h1>Beef</h1>
            </a>
          </li>
          <li class="box-img">
            <a href="categorys/Lamb">
              <img id="img-category" src="img/meat-3.jpg"></img>
              <h1>Lamb</h1>
            </a>
          </li>
          <li class="box-img">
            <a href="#">
              <img id="img-category" src="img/meat-4.jpg"></img>
              <h1>Seafood</h1>
            </a>
          </li>
          <li class="box-img">
            <a href="#">
              <img id="img-category" src="img/meat-5.jpg"></img>
              <h1>Pork</h1>
            </a>
          </li>
          <li class="box-img">
            <a href="#">
              <img id="img-category" src="img/meat-6.jpg"></img>
              <h1>Smallgoods</h1>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
