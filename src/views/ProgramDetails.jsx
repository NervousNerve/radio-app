import { useContext } from "react";

import { ProgramContext } from "./Program";

import List from "../components/List";
import ListItem from "../components/ListItem";

function ProgramDetails() {
  const { program, episodes, setEpisodeId } = useContext(ProgramContext);

  return (
    <div className="container p-1">
      <img
        src={program.programimagetemplatewide}
        className="width-100"
        alt=""
      />

      <p>{program.description}</p>

      <button className="btn-round">
        <i className="far fa-heart" /> Spara favorit
      </button>

      <h2>Avsnitt</h2>
      <div className="grid-col gap-1">
        <List>
          {episodes &&
            episodes.map((episode) => (
              <ListItem
                key={episode.id}
                thumbnail={episode.imageurl}
                onClick={() => {
                  setEpisodeId(episode.id);
                }}
              >
                <p className="text-bold m-0 mb-05">{episode.title}</p>
                <p className="font-size-sm m-0 color-dark">
                  Sändes:{" "}
                  <span className="">
                    {episode.publishdateutc.toLocaleString("sv-SE", {
                      dateStyle: "short",
                    })}
                  </span>
                </p>
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
}

export default ProgramDetails;
