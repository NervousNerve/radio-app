import { useState, useEffect } from "react";
import { useParams } from "react-router";

function Episode() {
  const { id } = useParams();
  const [episode, setEpisode] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/programs/" + id);
      const data = await response.json();
      setEpisode(data);
    })();
  }, [id]);

  if (!episode) return null;

  return <div></div>;
}

export default Episode;
