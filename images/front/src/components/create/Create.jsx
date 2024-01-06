import { useState, useEffect } from "react";
import "./create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Create() {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [producer, setProducer] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userId"));
    console.log(userId);
    setUserName(window.sessionStorage.getItem("userName"));
    console.log(userName);
  }, [userId, userName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formBody = {
      userId: userId,
      movieImg: poster,
      animeName: name,
      animeDescription: description,
      AnimeProducer: producer,
    };

    console.log(formBody);

    axios
      .post("http://localhost:80/animes", formBody)
      .then((response) => {
        // do something with the response data
        console.log(response);
        navigate(`/home`);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="create">
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
        <h3 className="addanimetitle">Add a movie</h3>
      </div>

      <form className="addanimeform" onSubmit={handleSubmit}>
        <div className="firstaddanimeform">
          <div className="inputform">
            <label className="namelabel label">Name</label>
            <input
              type="text"
              className="nameinput input"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="inputform">
            <label className="posterlabel label">Image (url)</label>
            <input
              type="text"
              className="posterinput input"
              name="poster"
              onChange={(e) => setPoster(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="secondaddanimeform">
          <div className="inputform">
            <label className="producerlabel label">Producer</label>
            <input
              type="text"
              className="producerinput input"
              name="producer"
              onChange={(e) => setProducer(e.target.value)}
            ></input>
          </div>
          <div className="inputform">
           <label className="descriptionlabel label">Description</label>
            <textarea
              type="text"
              className="description input"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="addanimesubmit">
          Add
        </button>
      </form>
    </div>
  );
}
