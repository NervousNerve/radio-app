import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import List from "../components/List";
import ListItem from "../components/ListItem";

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
    <div className="grid-col gap-1 p-1">
      <List>
        {programs &&
          programs
            .sort((a, b) => a.name.localeCompare(b.name, "sv"))
            .map((program) => (
              <ListItem
                key={program.id}
                thumbnail={program.programimage}
                onClick={() => {
                  history.push("/programs/" + program.id);
                }}
              >
                <p className="text-bold m-0">{program.name}</p>
              </ListItem>
            ))}
      </List>
    </div>
  );
}

export default Programs;
