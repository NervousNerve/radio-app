import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import Headerbar from "../components/Headerbar";
import List from "../components/List";

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
      setEpisode(data);
    })();
  }, [episodeId]);

  if (!program) return null;

  return (
    <div>
      <Headerbar>
        <div className="grid-row align-center bg-dark px-1 height-100">
          <h1 className="font-size-1">{program.name}</h1>
        </div>
        {episode && (
          <div className="grid-row align-center px-1 height-100">
            <h2 className="font-size-1">{episode.title}</h2>
          </div>
        )}
      </Headerbar>

      {!episode && (
        <div className="p-1">
          <p>{program.description}</p>

          <h2>Avsnitt</h2>
          <div className="grid-col gap-1">
            {episodes && (
              <List
                items={episodes.map((episode) => {
                  return {
                    id: episode.id,
                    image: episode.imageurl,
                    text: episode.title,
                  };
                })}
                clickItem={(item) => {
                  setEpisodeId(item.id);
                }}
              ></List>
            )}
          </div>
        </div>
      )}

      {episode && (
        <div className="p-1">
          <p>{episode.description}</p>
        </div>
      )}
    </div>
  );
}

export default Program;
