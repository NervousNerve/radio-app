import { useContext } from "react";

import { ProgramContext } from "./Program";

function ProgramEpisode() {
  const { episode } = useContext(ProgramContext);

  return (
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
  );
}

export default ProgramEpisode;
