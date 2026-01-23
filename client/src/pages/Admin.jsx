import { useState } from "react";
import { api } from "../services/api";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/admin/login", { username, password });
    localStorage.setItem("token", res.data.token);
    alert("Admin logged in");
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
