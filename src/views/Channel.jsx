import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels/" + id);
      const data = await response.json();
      setChannel(data);
    })();
  }, []);

  if (!channel) return null;

  return (
    <div>
      <p>{channel.name}</p>
    </div>
  );
}

export default Channel;
