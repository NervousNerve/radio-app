import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import List from "../components/List";
import ListItem from "../components/ListItem";

import { getAllChannels } from "../data/channels";

function Channels() {
  const history = useHistory();
  const [channels, setChannels] = useState();

  useEffect(() => {
    getAllChannels().then((channels) => setChannels(channels));
  }, []);

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

export default Channels;
