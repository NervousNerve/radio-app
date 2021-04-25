import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import Headerbar from "../components/Headerbar";
import List from "../components/List";
import ListItem from "../components/ListItem";
import parseDate from "../util/parseDate";

function Program() {
  const { id } = useParams();
  const [program, setProgram] = useState();
  const [episodes, setEpisodes] = useState();
  const [episode, setEpisode] = useState();
  const [episodeId, setEpisodeId] = useQueryParam("episode");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/programs/" + id);
      const data = await response.json();
      setProgram(data);
    })();

    (async () => {
      const response = await fetch("/api/v1/episodes?program=" + id);
      const data = await response.json();

      // Replace date strings like "/Date(1619215200000)/" with corresponding Date objects
      for (let e of data) {
        e.publishdateutc = parseDate(e.publishdateutc);
      }

      setEpisodes(data);
    })();
  }, [id]);

  useEffect(() => {
    if (!episodeId) {
      setEpisode(null);
      return;
    }

    (async () => {
      const response = await fetch("/api/v1/episodes/" + episodeId);
      const data = await response.json();

      // Replace date strings like "/Date(1619215200000)/" with corresponding Date objects
      data.publishdateutc = parseDate(data.publishdateutc);

      setEpisode(data);
    })();
  }, [episodeId]);

  if (!program) return null;

  return (
    <div>
      <Headerbar>
        <div className="grid-row align-center bg-dark px-1 height-100">
          <h1 className="font-size-md">{program.name}</h1>
        </div>
        {episode && (
          <div className="grid-row align-center px-1 height-100">
            <h2 className="font-size-md">{episode.title}</h2>
          </div>
        )}
      </Headerbar>

      {!episode && (
        <div className="container p-1">
          <img
            src={program.programimagetemplatewide}
            className="width-100"
            alt=""
          />
          <p>{program.description}</p>

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
      )}

      {episode && (
        <div className="container p-1">
          <img src={episode.imageurltemplate} className="width-100" alt="" />
          <p>{episode.description}</p>
          <p className="color-dark">
            Sändes:{" "}
            {episode.publishdateutc.toLocaleString("sv-SE", {
              dateStyle: "short",
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default Program;
