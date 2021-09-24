import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Content from "./components/Content";
import FullSectionColumns from "./components/FullSectionColumns";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { List } from "semantic-ui-react";

const url = "https://api.sorucanavari.com/films";

const App = () => {
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      setFilms(res.data.films.reverse());
    });
    axios.get(url).then((res) => {
      setSeries(res.data.series.reverse());
    });
  }, []);

  const getImage = (data) => {
    const imagePath = "https://api.sorucanavari.com/images/film_images/";
    try {
      var im = data.picture.replace(/\s/g, "%20");
    } catch (error) {
      var im = data.picture;
    }
    return imagePath + im;
  };

  const Genres = ({ data }) => {
    let genres = "";
    data.genres.map((genre) => (genres += genre + ", "));

    return genres.length ? (
      <div
        className="d-flex mt-2"
        style={{ justifyContent: "space-between", color: "gray" }}
      >
        Tür:
        <div className="gray text-white">
          {genres.substring(0, genres.length - 2)}
        </div>
      </div>
    ) : null;
  };

  const WtwIcons = ({ data }) => {
    const icons = {
      netflix: {
        icon: "https://iconape.com/wp-content/files/wi/83744/png/netflix-icon-2016-1.png",
      },
      yabancıdizi: {
        icon: "https://cdn.discordapp.com/attachments/258642488737136641/858736871768326144/yabancdizi.png",
      },
      filmmodu: {
        icon: "https://cdn.discordapp.com/attachments/258642488737136641/858736873878061066/filmmodu.png",
      },
      fullhdfilmizle: {
        icon: "https://cdn.discordapp.com/attachments/258642488737136641/858736876226740255/fullhdfilmizlesene.png",
      },
    };

    const [platform, setPlatform] = useState([]);

    useEffect(() => {
      data.whereToWatch.map((wtw) => {
        Object.keys(icons).forEach((item, index) => {
          if (wtw.name.toLowerCase().slice(0, 2) === item.slice(0, 2)) {
            setPlatform((prev) => [...prev, Object.values(icons)[index].icon]);
          }
        });
      });
    }, []);

    return (
      <div id="wtw" className="d-flex">
        {platform.map((platform) => (
          <div
            className="icon me-2"
            style={{
              backgroundImage: `url(${platform})`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  const card = (data) => {
    return (
      <Link key={data.id} to={(data.type_of + "/" + data.slug).toLowerCase()}>
        <div className="card">
          <div
            className="media"
            style={{
              backgroundImage: `url(${getImage(data)})`,
            }}
          >
            <div id="moreClick" className="text-center text-white">
              <span
                style={{
                  backgroundColor: "#000000",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Daha fazlası için tıkla
              </span>
            </div>
          </div>
          <div className="desc">
            <div
              id="title"
              className="d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <h2
                className="text-white mb-2"
                style={{ transform: "translateY(10%)", fontWeight: "normal" }}
              >
                {data.title}
              </h2>
              <div
                className="text-white text-center"
                style={{
                  height: "38px",
                  width: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#303030",
                }}
              >
                <h4 style={{ transform: "translateY(50%)" }}>
                  {data.points[0].point}
                </h4>
              </div>
            </div>
            <WtwIcons data={data} />
            <List divided inverted relaxed className="fixed">
              <List.Item>
                <div
                  className="d-flex my-2"
                  style={{ justifyContent: "space-between", color: "gray" }}
                >
                  Yayın Tarihi:
                  <div className="gray text-white">{data.publishDate}</div>
                </div>
              </List.Item>
              <List.Item>
                <Genres data={data} />
              </List.Item>
            </List>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/:type_of/:slug">
            <Content getImage={getImage} />
          </Route>
          <Route path="/:sectionId">
            <FullSectionColumns films={films} series={series} card={card} />
          </Route>
          <Route path="/">
            <Home films={films} series={series} card={card} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
