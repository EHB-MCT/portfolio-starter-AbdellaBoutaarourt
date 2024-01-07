import { useEffect, useState } from "react";
import "./home.scss";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [userName, setUserName] = useState();
  const [userId, setUserID] = useState();
  const [animes, setAnimes] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let userId = window.sessionStorage.getItem("userId");
    setUserID(userId);
    let userName = window.sessionStorage.getItem("userName");
    setUserName(userName);

    if (!userId) return;

    axios
      .get(`http://localhost:80/animes/saved/${userId}`)
      .then((response) => {
        setAnimes(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, [userId, navigate]);

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    console.log(animes);
  }, [animes]);

  const handleDelete = (event) => {
    const elementId = event.target.id;
    console.log(elementId);
    axios
      .delete(`http://localhost:80/animes/${elementId}`)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="home">
      <div className="topwebsite">
        <h3 className="hey">Hey , {userName}!</h3>
        <h3 className="addanimetitle">Home</h3>
        <Link to="/profile" className="gotoprofilbtn">
          <h3 className="addanimetitle">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </h3>
        </Link>
      </div>
      <div className="addanimebtndiv">
        <Link to={`/create`} style={{ textDecoration: "none", color: "white" }}>
          <button className="addanimebtn">+</button>
            </Link>
      </div>
      <div className="animescontainer">
  {animes &&
    animes.map((anime) => (
      <div className="animecontainer" key={anime.id}>
        <Link to={`/info/${anime.id}`}>
          <img className="animeposter" src={anime.animeImg} alt={`Poster for ${anime.animeName}`} />
        </Link>
        <div className="animebottom">
          <p className="animename">{anime.animeName}</p>
          <div className="tools">
            <p className="deletebtn" id={anime.id} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="icon" id={anime.id} style={{ pointerEvents: "none" }} />
            </p>
          </div>
        </div>
      </div>
    ))}
</div>
    </div>
  );
}
