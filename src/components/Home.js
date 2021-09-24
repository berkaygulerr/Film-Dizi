import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";

const Home = ({ films, series, card }) => {
  const columns = 3;

  const SectionColumns = ({ sectionId, data, header }) => {
    let dataTemp = [...data];
    dataTemp.splice(9, data.length);

    const [datas, setDatas] = useState(dataTemp);

    const handleMoreClick = () => {
      let Temp = [...data];
      Temp.splice(datas.length * 2, data.length);
      setDatas(Temp);
    };

    return (
      <section id={sectionId}>
        <h2 className="sectionHeader text-white text-center display-4">
          {header}
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
          {datas.length !== data.length ? (
            <div className="text-center mt-4">
              <Button
                className="moreButton mb-5"
                size="huge"
                onClick={() => handleMoreClick()}
              >
                Daha Fazla..
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    );
  };

  return (
    <div>
      <div className="container">
        <SectionColumns
          sectionId="film"
          data={films}
          header="Son Eklenen Filmler"
        />
        <SectionColumns
          sectionId="dizi"
          data={series}
          header="Son Eklenen Diziler"
        />
      </div>
    </div>
  );
};

export default Home;
