import { Link } from "react-router-dom";
import "../user/user.css";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { GetApi } from "../../api/get-api";
import { PostApi } from "../../api/post-api";
export default function User() {
  const [loadIcon, setLoadIcon] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    token &&
      GetApi("", "users/getme")
        .then((res) => {
          console.log(res.data);
          setAddress(res.data.address);
          setEmail(res.data.email);
          setName(res.data.name);
          setPhone(res.data.phone);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError([...err.response.data.message]);
        });
  }, [token]);
  const updateInfo = () => {
    setLoadIcon(true);
    const newInfo = {
      name,
      email,
      address,
      phone,
    };
    PostApi("", newInfo, "users/update")
      .then((res) => {
        setLoadIcon(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div class="main-user">
      <div class="info-user">
        <div>
          <h1>Thông tin cá nhân</h1>
        </div>
        <div id="main-user-avar">
          <div id="user-avar"></div>
        </div>
        <div id="main-info-user">
          <div id="box-input">
            <label>Tên</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="input-login"
              type="text"
              name="name"
              placeholder="Tên"
            />
          </div>
          <div id="box-input">
            <label>Email</label>
            <input
              id="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="box-input">
            <label>Địa chỉ</label>

            <input
              id="input-login"
              type="text"
              name="name"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div id="box-input">
            <label>Số điện thoại</label>
            <input
              id="input-login"
              type="text"
              name="name"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div id="fix-crack">
          <button id="input-login" onClick={() => updateInfo()}>
            <Link to="#" id="a-input-login">
              {loadIcon === true ? (
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={"12%"}
                  width={"12%"}
                  id="a-input-login"
                />
              ) : (
                "Thay đổi thông tin"
              )}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
