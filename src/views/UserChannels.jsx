import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import List from "../components/List";
import ListItem from "../components/ListItem";
import { UserContext } from "../contexts/UserContext";

function UserChannels() {
  const history = useHistory();
  const { favoriteChannels } = useContext(UserContext);
  const [channels, setChannels] = useState();

  useEffect(() => {
    if (!favoriteChannels) return;

    (async () => {
      try {
        const response = await fetch("/api/v1/channels");
        const data = await response.json();
        setChannels(
          data.filter((value) => favoriteChannels.includes(value.id))
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, [favoriteChannels]);

  return (
    <div className="p-1 container">
      <List>
        {channels &&
          channels.map((channel) => (
            <ListItem
              key={channel.id}
              thumbnail={channel.image}
              onClick={() => {
                history.push("/channels/" + channel.id);
              }}
            >
              <p className="text-bold m-0">{channel.name}</p>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default UserChannels;
