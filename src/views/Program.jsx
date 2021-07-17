import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import { UserContext } from "../contexts/UserContext";
import Headerbar from "../components/Headerbar";
import parseDate from "../util/parseDate";
import ProgramDetails from "./ProgramDetails";
import ProgramEpisode from "./ProgramEpisode";
import FavoriteButton from "../components/FavoriteButton";

import { getProgram } from "../data/programs";
import { getAllProgramEpisodes, getEpisode } from "../data/episodes";

export const ProgramContext = createContext();

function Program() {
  const { id } = useParams();
  const { user, favoritePrograms, saveFavoriteProgram, deleteFavoriteProgram } =
    useContext(UserContext);
  const [program, setProgram] = useState();
  // All episodes of this program
  const [episodes, setEpisodes] = useState();
  // Selected episode object
  const [episode, setEpisode] = useState();
  // Query param with id of selected episode
  const [episodeId, setEpisodeId] = useQueryParam("episode");

  useEffect(() => {
    // Load requested program
    getProgram(id).then((prog) => setProgram(prog));

    // Load all episode of requested program
    getAllProgramEpisodes(id).then((eps) => {
      // Replace date strings with actual Date objects
      for (let e of eps) {
        e.publishdateutc = parseDate(e.publishdateutc);
      }
      setEpisodes(eps);
    });
  }, [id]);

  // When query param "?episode" changes
  useEffect(() => {
    // Was the param removed?
    if (!episodeId) {
      setEpisode(null);
      return;
    }

    // Load requested episode
    getEpisode(episodeId).then((ep) => {
      ep.publishdateutc = parseDate(ep.publishdateutc);
      setEpisode(ep);
    });
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
