import "./login.css";
import { useState } from "react";
import axios from "axios";
import { PostApi } from "../../api/post-api";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [listError, setError] = useState([]);
  const navigate = useNavigate();
  const [loadIcon, setLoadIcon] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [name, setName] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [notification, setNotification] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const login = () => {
    setLoadIcon(true);
    if (!email || !password) {
      setShowError(true);
      setLoadIcon(false);

      setError(["Email or Password is not empty"]);
      return;
    }
    const account = {
      email,
      password,
    };
    PostApi("", account, "auth/login")
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
        window.location.reload("");
        setLoadIcon(false);
      })
      .catch((err) => {
        console.log(err.response);
        Array.isArray(err.response.data.message)
          ? setError([...err.response.data.message])
          : setError([err.response.data.message]);
        console.log(listError);
        setShowError(true);
        setLoadIcon(false);
      });
  };

  const register = () => {
    setLoadIcon(true);
    if (password !== confirmPw) {
      setShowError(true);
      setLoadIcon(false);
      setError(["Confirm password does not match"]);
      return;
    }
    const account = {
      name,
      email,
      password,
      address,
      phone,
    };
    PostApi("", account, "auth/register")
      .then((res) => {
        setLoadIcon(false);
        setNotification(res.data.message);
        console.log(notification);
      })
      .catch((err) => {
        console.log(err.response);
        Array.isArray(err.response.data.message)
          ? setError([...err.response.data.message])
          : setError([err.response.data.message]);
        console.log(listError);
        setShowError(true);
        setLoadIcon(false);
      });
  };

  return (
    <div class="main-login">
      {loginPage ? (
        <div id="container">
          <h1>Log In</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={email}
              id="input-login"
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              id="input-login"
              type="password"
              name="pass"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="input-login" onClick={login}>
              <Link to="//" id="a-input-login">
                {loadIcon === true ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={"15%"}
                    width={"15%"}
                    id="a-input-login"
                  />
                ) : (
                  "Log in"
                )}
              </Link>
            </button>
            <div id="remember-container">
              <Link
                to="//"
                id="register"
                onClick={() => {
                  setLoginPage(false);
                  setError([]);
                  setEmail("");
                  setPassword("");
                }}
              >
                Register account
              </Link>
            </div>
          </form>
        </div>
      ) : !notification ? (
        <div id="container">
          <h1>Register</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={name}
              id="input-login"
              type="email"
              name="email"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={email}
              id="input-login"
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="input-login"
              type="text"
              name="name"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              id="input-login"
              type="text"
              name="name"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              value={password}
              id="input-login"
              type="password"
              name="pass"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              value={confirmPw}
              id="input-login"
              type="password"
              name="pass"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <button id="input-login" onClick={register}>
              <Link to="//">
                {loadIcon === true ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={"10%"}
                    width={"10%"}
                    id="a-input-login"
                  />
                ) : (
                  "Register"
                )}
              </Link>
            </button>
            <div id="remember-container">
              <a>Đã có sẵn tài khoản ? </a>
              <a href="/login" id="register">
                Đăng nhập ngay
              </a>
            </div>
          </form>
        </div>
      ) : (
        <div id="container">
          <h1>{notification}</h1>
          <a href="/login" id="login-now">
            Login now
          </a>
        </div>
      )}

      {showError && (
        <div class="show-error">
          {listError.map((err) => {
            return <div>{err}</div>;
          })}
        </div>
      )}
    </div>
  );
}
