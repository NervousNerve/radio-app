import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import List from "../components/List";
import ListItem from "../components/ListItem";

function Channels() {
  const history = useHistory();
  const [channels, setChannels] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels");
      const data = await response.json();
      setChannels(data);
    })();
  }, []);

  return (
    <div className="p-1">
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

export default Channels;
