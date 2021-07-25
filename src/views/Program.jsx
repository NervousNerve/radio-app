import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import { UserContext } from "../contexts/UserContext";
import Headerbar from "../components/Headerbar";
import parseDate from "../util/parseDate";
import ProgramDetails from "./ProgramDetails";
import ProgramEpisode from "./ProgramEpisode";
import FavoriteButton from "../components/FavoriteButton";

export const ProgramContext = createContext();

function Program() {
  const { id } = useParams();
  const {
    user,
    favoritePrograms,
    saveFavoriteProgram,
    deleteFavoriteProgram,
  } = useContext(UserContext);
  const [program, setProgram] = useState();
  // All episodes of this program
  const [episodes, setEpisodes] = useState();
  // Selected episode object
  const [episode, setEpisode] = useState();
  // Query param with id of selected episode
  const [episodeId, setEpisodeId] = useQueryParam("episode");

  useEffect(() => {
    // Load requested program
    (async () => {
      const response = await fetch("/api/v1/programs/" + id);
      const data = await response.json();
      setProgram(data);
    })();

    // Load all episode of requested program
    (async () => {
      const response = await fetch("/api/v1/episodes?program=" + id);
      const data = await response.json();

      // Replace date strings with actual Date objects
      for (let e of data) {
        e.publishdateutc = parseDate(e.publishdateutc);
      }

      setEpisodes(data);
    })();
  }, [id]);

  // When query param "?episode" changes
  useEffect(() => {
    // Was the param removed?
    if (!episodeId) {
      setEpisode(null);
      return;
    }

    // Load requested episode
    (async () => {
      const response = await fetch("/api/v1/episodes/" + episodeId);
      const data = await response.json();

      // Replace date strings with actual Date objects
      data.publishdateutc = parseDate(data.publishdateutc);

      setEpisode(data);
    })();
  }, [episodeId]);

  if (!program) return null;

  const values = { program, episode, episodes, setEpisodeId };

  return (
    <ProgramContext.Provider value={values}>
      <Headerbar>
        <div className="grid-row align-center px-1 bg-dark">
          <h1 className="font-size-md">{program.name}</h1>
        </div>

        {episode && (
          <div className="grid-row align-center px-1">
            <h2 className="font-size-md">{episode.title}</h2>
          </div>
        )}

        <div className="grid-row align-center gap-1 justify-end flex-grow">
          {user && (
            <FavoriteButton
              saved={favoritePrograms && favoritePrograms.includes(program.id)}
              onSave={() => {
                saveFavoriteProgram(program.id);
              }}
              onRemove={() => {
                deleteFavoriteProgram(program.id);
              }}
            />
          )}
        </div>
      </Headerbar>

      {!episode ? <ProgramDetails /> : <ProgramEpisode />}
    </ProgramContext.Provider>
  );
}

export default Program;
