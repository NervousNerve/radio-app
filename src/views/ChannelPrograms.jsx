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
                onClick={() => {
                  history.push("/programs/" + program.id);
                }}
              >
                <img
                  src={program.programimage}
                  style={{ width: "var(--bar-height)" }}
                  alt=""
                />
                <p className="text-bold px-1">{program.name}</p>
              </ListItem>
            ))}
      </List>
    </div>
  );
}

export default Programs;
