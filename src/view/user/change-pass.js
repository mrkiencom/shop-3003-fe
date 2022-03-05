import { useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { PostApi } from "../../api/post-api";

export default function ChangePw() {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [loadIcon, setLoadIcon] = useState(false);
  const [pwConfirm, setPwConfirm] = useState();
  const [error, setError] = useState([]);
  const changePw = () => {
    setLoadIcon(true);
    setError([]);
    if (newPassword !== pwConfirm) {
      setError(["Mật khẩu xác nhận không trùng khớp"]);
      setLoadIcon(false);
      return;
    }
    PostApi("", { oldPassword, newPassword }, "users/change-password")
      .then((res) => {
        console.log(res);
        setLoadIcon(false);
        setNewPassword(false);
        setPwConfirm(false);
        setOldPassword(false);
      })
      .catch((err) => {
        setError([err.response.data.message]);
        setLoadIcon(false);
      });
  };
  console.log(error);
  return (
    <div class="main-user">
      <div class="info-user">
        <div>
          <h1>Thay đổi mật khẩu</h1>
        </div>

        <div id="main-info-user">
          <div id="box-input">
            <label>Mật khẩu cũ</label>

            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="input-login"
              type="password"
              name="name"
              placeholder="Mật khẩu cũ"
            />
          </div>
          <div id="box-input">
            <label>Mật khẩu mới</label>
            <input
              id="input-login"
              type="password"
              name="nane"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div id="box-input">
            <label>Xác nhận mật khẩu mới</label>
            <input
              id="input-login"
              type="password"
              name="nane"
              placeholder="Xác nhận Mật khẩu mới"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
            />
          </div>
        </div>
        <div id="fix-crack">
          <button id="input-login" onClick={() => changePw()}>
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
        {error && (
          <div>
            {error.map((err) => {
              return <p id="text-error">{err}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
