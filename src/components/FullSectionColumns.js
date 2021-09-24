import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

const FullSectionColumns = ({ films, series, card }) => {
  const [datas, setDatas] = useState([]);

  const { sectionId } = useParams();
  const columns = 3;

  let data = sectionId === "film" ? films : series;

  let dataTemp = [...data];
  dataTemp.splice(9, data.length);

  useEffect(() => {
    setDatas(dataTemp);
  }, [data]);

  const handleMoreClick = () => {
    let Temp = [...data];
    Temp.splice(datas.length * 2, data.length);
    setDatas(Temp);
  };

  const handleScroll = () => {
    let bottom =
      window.scrollY ===
      document.body.scrollHeight - document.body.clientHeight;

    if (bottom) {
      handleMoreClick();
      return true;
    }
  };

  document.body.onscroll = () => handleScroll();

  return (
    <div className="container">
      <section id={sectionId}>
        <h2 className="sectionHeader text-white text-center display-4">
          {sectionId === "film" ? "Filmler" : "Diziler"}
        </h2>
        <div className="columns">
          <Grid columns={columns}>
            <Grid.Row>
              <Grid.Column className="column">
                {datas.map((item) => {
                  if (item.id % columns === 0) {
                    return card(item);
                  } else {
                    return false;
                  }
                })}
              </Grid.Column>
              <Grid.Column className="column">
                {datas.map((item) => {
                  if (item.id % columns === 2) {
                    return card(item);
                  } else {
                    return false;
                  }
                })}
              </Grid.Column>
              <Grid.Column className="column">
                {datas.map((item) => {
                  if (item.id % columns === 1) {
                    return card(item);
                  } else {
                    return false;
                  }
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {datas.length !== data.length && handleScroll ? (
            <div className="text-center mt-4">
              <Button className="moreButton mb-3" size="huge">
                <div class="spinner-border text-secondary" role="status">
                  <span class="sr-only"></span>
                </div>
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default FullSectionColumns;
