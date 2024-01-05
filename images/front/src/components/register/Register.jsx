/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formBody = {
      name: username,
      email: email,
      password: password,
    };

    console.log(formBody);

    axios
      .post("http://localhost:80/users/register", formBody)
      .then((response) => {
        // do something with the response data
        console.log(response);
        navigate(`/login`);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="main">
      <h1 className="introtitle">
      To Keep
         <span style={{ color: "#CB1212" }}> Track</span> of the Anime You've Watched
      </h1>

      <div className="form">
        <h2 className="formtitle">Create an account now !</h2>
        <form onSubmit={handleSubmit}>
          <div className="topform">
            <div className="usernamediv">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                className="usernameinput"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="bottomform">
            <div className="emaildiv">
              <label className="label">Email</label>
              <input
                type="text"
                name="email"
                className="emailinput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passworddiv">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="passwordinput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submitregisterdiv">
            <button type="submit" className="registerbtn">
              Register
            </button>
            <p className="signinredirect">
              Already have an account ?
              <a>
                &nbsp;
                <Link
                  to="/login"
                  className="loginbtna"
                  style={{ textDecoration: "none" }}
                >
                  <b className="loginbtn">Click here</b>
                </Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
