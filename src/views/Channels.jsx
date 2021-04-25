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
              onClick={() => {
                history.push("/channels/" + channel.id);
              }}
            >
              <img src={channel.image} style={{ width: "4rem" }} alt="" />
              <p className="text-bold px-1">{channel.name}</p>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default Channels;
