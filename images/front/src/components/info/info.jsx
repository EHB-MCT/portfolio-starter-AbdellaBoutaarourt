import { useState, useEffect } from "react";
import "./info.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Info() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [anime, setAnime] = useState();
  const navigate = useNavigate();
  const { animeid } = useParams();



  useEffect(() => {
    let userId = window.sessionStorage.getItem("userId");
    setUserId(userId);
    let userName = window.sessionStorage.getItem("userName");
    setUserName(userName);

    console.log("Anime ID:", animeid);


    if (!userId) return;

    axios
      .get(`http://localhost:80/animes/${animeid}`)
      .then((response) => {
        // do something with the response data
        setAnime(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, [userId, animeid]);

  useEffect(() => {
    console.log(anime);
  }, [anime]);




  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="info">
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
        {anime && <h3 className="addanimetitle">{anime[0].animeName}</h3>}
      </div>
      {anime && (
        <div className="specificmain">
          <div className="mainleft">
            <img className="animeimg" src={anime[0].animeImg}></img>
          </div>

          <div className="mainright">
            <h1 className="animetitle text">{anime[0].animeName}</h1>
            <h2 className="animeproducer text">
              Producer : {anime[0].AnimeProducer}
            </h2>
            <p className="animedescription text">
              Description :<br />
              <br />
              {anime[0].animeDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
