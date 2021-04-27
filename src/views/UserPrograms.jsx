import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import List from "../components/List";
import ListItem from "../components/ListItem";
import { UserContext } from "../contexts/UserContext";

function UserPrograms() {
  const history = useHistory();
  const { favoritePrograms } = useContext(UserContext);
  const [programs, setPrograms] = useState();

  useEffect(() => {
    if (!favoritePrograms) return;

    (async () => {
      try {
        const response = await fetch("/api/v1/programs");
        const data = await response.json();
        setPrograms(
          data.filter((value) => favoritePrograms.includes(value.id))
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, [favoritePrograms]);

  return (
    <div className="p-1 container">
      <List>
        {programs &&
          programs.map((program) => (
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

export default UserPrograms;
