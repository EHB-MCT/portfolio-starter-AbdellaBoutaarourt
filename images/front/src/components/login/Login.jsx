import { useState } from "react";
import "./login.scss";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const formBody = {
    email: email,
    password: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formBody);

    axios
      .post("http://localhost:80/user/login", formBody)
      .then((response) => {
        // do something with the response data
        console.log(response);

        if (response) {
          sessionStorage.setItem("userId", response.data.id);
          sessionStorage.setItem("userName", response.data.firstname);
          navigate(`/home`);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <div className="login">
      <h1 className="titl">Welcome back !</h1>
      <form className="loginform" onSubmit={handleSubmit}>
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="emailinput input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="passwordinput input"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="submitlogin">
          Login
        </button>
        <p className="redirectsignup">
          Dont have an account ?{" "}
          <Link
            to="/"
            className="loginbtna"
            style={{ textDecoration: "none", color: "rgb(173, 173, 173)" }}
          >
            <b>Sign up here</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
