import { useState, useEffect } from "react";
import { useParams } from "react-router";

function Program() {
  const { id } = useParams();
  const [program, setProgram] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/programs/" + id);
      const data = await response.json();
      setProgram(data);
    })();
  }, [id]);

  if (!program) return null;

  return (
    <div>
      <h1>{program.name}</h1>
      <p>{program.description}</p>
    </div>
  );
}

export default Program;
