import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", form);

    const token = res.data.token;

    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);

    if (decoded.role === "user") {
      navigate("/dashboard");
    } else if (decoded.role === "recruiter") {
      navigate("/recruiter-dashboard");
    } else if (decoded.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button>Login</button>
      <p>
        Don't have an acount? <Link to="/register">Register here</Link>{" "}
      </p>
    </form>
  );
}

export default Login;
