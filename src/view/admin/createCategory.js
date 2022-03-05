import { useEffect, useState } from "react";
import { PostApi } from "../../api/post-api";

export default function CreateCategory() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const createCategory = () => {
    const nameCategory = { name };
    PostApi(token, nameCategory, "categorys/create")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
    setName("");
  };
  return (
    <div class="main-create-category">
      <h1>Create Category</h1>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={createCategory}>Create</button>
    </div>
  );
}
