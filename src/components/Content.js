import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Content = ({ getImage }) => {
  const [data, setData] = useState({});
  const [showPop, setShowPop] = useState(false);
  const [showImgPop, setShowImgPop] = useState(false);

  const { slug } = useParams();

  const url = "https://api.sorucanavari.com/films/";

  useEffect(() => {
    axios.get(url + slug).then((res) => {
      setData(res.data.data[0]);
    });
  }, []);

  const Popup = () => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        setShowPop(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
          backgroundColor: "rgba(0,0,0, 0.9)",
        }}
        onClick={() => setShowPop(false)}
      >
        <div className="text-center row">
          <div className="col-11 mt-5">
            <h1>{data.title + " Fragman"}</h1>
          </div>
          <div className="col-1">
            <button
              id="closePop"
              className="float-end m-5 text-center"
              style={{
                color: "black",
                backgroundColor: "white",
                width: "45px",
                height: "45px",
                border: "none",
                borderRadius: "2rem",
              }}
            >
              <span class="material-icons">&#xe14c;</span>
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "10%",
            margin: "auto",
            background: "black",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={data.trailerUrl + "?autoplay=1"}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white">
      <div
        className="contentBack"
        style={{ backgroundColor: "#303030", height: "500px" }}
      >
        <div
          style={{
            position: "absolute",
            height: "500px",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => setShowPop(true)}
        ></div>
        <iframe
          width="100%"
          height="100%"
          src={data.trailerUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="container d-flex">
        <div
          id="contentImg"
          style={{
            backgroundImage: `url(${getImage(data)})`,
            height: "340px",
            width: "250px",
            backgroundPosition: "50%",
            backgroundSize: "cover",
            borderRadius: "10px",
            transform: "translateY(-30%)",
          }}
        ></div>
        <div
          id="contentProps"
          className="m-4 px-5 py-4"
          style={{
            backgroundColor: "#202020",
            width: "80%",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>
      {showPop ? <Popup /> : null}
    </div>
  );
};

export default Content;
