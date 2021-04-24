import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import List from "../components/List";

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
      {channels && (
        <List
          items={channels.map((channel) => {
            return {
              image: channel.image,
              text: channel.name,
              id: channel.id,
            };
          })}
          clickItem={(item) => {
            history.push("/channels/" + item.id);
          }}
        ></List>
      )}
    </div>
  );
}

export default Channels;
