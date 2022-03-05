import "../css/footer.css";
import { MdMaximize } from "react-icons/md";
export default function footer() {
  return (
    <div class="footer-main">
      <div class="footer-content">
        <div class="footer-left">
          <ul class="ul-footer">
            <li class="h3">
              <h3>
                <MdMaximize size="10" />
                OPENING HOURS
                <MdMaximize size="10" />
              </h3>
            </li>
            <li>
              <p>Mon-Fri 7 am to 6 pm</p>
            </li>
            <li>
              <p>Sat 7 am to 5 pm</p>
            </li>
            <li>
              <p>Sun 8 am to 4 pm</p>
            </li>
            <li>
              <p>CLOSED Good Friday & Christmas Day</p>
            </li>
            <li>
              <p>OPEN ALL other public holidays</p>
            </li>
          </ul>
        </div>
        <div class="footer-center">
          <div class="logo-footer">
            <img id="logo-footer-img" src="/img/fresh-meats-logo.png"></img>
          </div>
          <ul class="info-contact">
            <li> 0344259499</li>
            <li>86 Wises Road</li>
            <li>Maroochydore QLD 4558</li>
          </ul>
        </div>
        <div class="footer-right">
          <ul class="ul-footer ">
            <li class="h3">
              <h3>
                <MdMaximize size="10" />
                USEFUL LINKS
                <MdMaximize size="10" />
              </h3>
            </li>
            <li>
              <p>Join Our Team</p>
            </li>
            <li>
              <p>Contact Us</p>
            </li>
            <li>
              <p>Delivery Policy</p>
            </li>
            <li>
              <p>Member Rewards</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
