import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import List from "../../components/List";

function Programs() {
  const history = useHistory();
  const { id } = useParams();
  const [programs, setPrograms] = useState();

  useEffect(() => {
    // Fetch schedule for this channel
    (async () => {
      const response = await fetch(`/api/v1/programs?channel=${id}`);
      const data = await response.json();
      setPrograms(data);
    })();
  }, [id]);

  if (!programs) return null;

  return (
    <List
      items={programs.map((program) => {
        return {
          image: program.programimage,
          text: program.name,
          id: program.id,
        };
      })}
      clickItem={(item) => {
        history.push("/programs/" + item.id);
      }}
    />
  );
}

export default Programs;
