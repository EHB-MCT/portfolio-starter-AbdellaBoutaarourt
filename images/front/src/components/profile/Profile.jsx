import { useEffect, useState } from "react";
import "./profile.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);


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
        const userInfo = response.data.userInfo;
        setUser(userInfo.name);
        setUserName(userInfo.name.name);
        setEmail(userInfo.name.email);
        setPassword(userInfo.name.password);
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
  }, [navigate]);


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

  const handleDelete = () => {
    axios
      .delete(`http://localhost:80/users/${userId}`)
      .then(() => {
        window.sessionStorage.removeItem("userId");
        window.sessionStorage.removeItem("userName");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      name: userName,
      email: email,
      password: password,
    };

    console.log(body);
    axios
    .put(`http://localhost:80/users/${userId}`, body)
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("userName", userName);
      location.reload();

    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleBackToHome = () => {
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
        <h3 className="addanimetitle">My profile</h3>
      </div>

      {user && (
        <div className="profilemain">
          <form onSubmit={handleUpdate} autoComplete="off">
            <h3 className="name text">
            Username :{" "}
              <p className="name">{user.name}</p>{" "}
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
                  className="usernameinput input"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
                <button type="submit" className="submitbtn">
                  Submit
                </button>
              </div>
            </h3>

            <h3 className="email text">
            Email : <p className="name">{user.email}</p>{" "}
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
