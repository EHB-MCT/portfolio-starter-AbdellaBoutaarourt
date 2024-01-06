import { useEffect, useState } from "react";
import "./profile.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  console.log(
    "name :" + userName,
    "Email :" + email,
    "Password :" + password
  );

  useEffect(() => {
    let userId = window.sessionStorage.getItem("userId");
    setUserId(userId);
    let userName = window.sessionStorage.getItem("userName");
    setUserName(userName);

    if (!userId) return;

    axios
      .get(`http://localhost:80/users/${userId}`)
      .then((response) => {
        // do something with the response data
        setUser(response.data.userInfo);
        setEmail(response.data.userInfo.email);
        setPassword(response.data.userInfo.password);
        console.log(response)
      })
      .catch((error) => {
        throw error;
      });
  }, [userId]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [history]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleDisconnect = () => {
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("userName");
    navigate("/login");
  };

  const handleConfirmation = () => {
    setIsConfirmed(!isConfirmed);
  };

  const handleUpdateBtn = () => {
    setIsUpdate(!isUpdate);
  };

  const handleDelete = (event) => {
    axios
      .delete(`http://localhost:81/user/${userId}`)
      .then((data) => {
        window.sessionStorage.removeItem("userId");
        window.sessionStorage.removeItem("userName");
        navigate("/");
      })
      .catch((error) => {
        // handle error
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    console.log(body);
    axios
      .put(`http://localhost:81/user/${userId}`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("userName", firstname);
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBackToHome = (event) => {
    navigate("/home");
  };

  return (
    <div className="profile">
      <div className="topwebsite">
        <h3
          className="hey"
          style={{ color: "#a6a6a6", cursor: "pointer" }}
          onClick={handleBackToHome}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon"
            style={{ pointerEvents: "none", marginRight: "10px" }}
          />
          Back to home
        </h3>
        <h3 className="hey">Hey , {userName} !</h3>
        <h3 className="addmovietitle">My profile</h3>
      </div>

      {user && (
        <div className="profilemain">
          <form onSubmit={handleUpdate} autocomplete="off">

            <h3 className="lastname text">
              Lastname : <p className="name">{user[0].lastname}</p>{" "}
              <p onClick={handleUpdateBtn}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </p>
              <div
                className={
                  isUpdate ? "updateform active" : "updateform inactive"
                }
              >
                <input
                  type="text"
                  className="lastnameinput input"
                  name="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                ></input>
                <button type="submit" className="submitbtn">
                  Submit
                </button>
              </div>
            </h3>

            <h3 className="email text">
              Email : <p className="name">{user[0].email}</p>{" "}
              <p onClick={handleUpdateBtn}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </p>
              <div
                className={
                  isUpdate ? "updateform active" : "updateform inactive"
                }
              >
                <input
                  type="text"
                  className="emailinput input"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button type="submit" className="submitbtn">
                  Submit
                </button>
              </div>
            </h3>

            <h3 className="password text">
              Password
              <p onClick={handleUpdateBtn}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </p>
              <div
                className={
                  isUpdate ? "updateform active" : "updateform inactive"
                }
              >
                <input
                  type="password"
                  className="passwordinput input"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit" className="submitbtn">
                  Submit
                </button>
              </div>
            </h3>
          </form>
          <div className="profilebtns">
            <button className="disconnectbtn" onClick={handleDisconnect}>
              Disconnect
            </button>
            <div className="deletebtns">
              <button className="deletebtn" onClick={handleConfirmation}>
                Delete
              </button>
              <button
                className={
                  isConfirmed
                    ? "deletebtn confirmed active"
                    : "deletebtn confirmed inactive"
                }
                onClick={handleDelete}
              >
                Confirm delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
