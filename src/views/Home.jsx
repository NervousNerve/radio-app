import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [channels, setChannels] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels");
      const data = await response.json();
      setChannels(data);
    })();
  }, []);

  return (
    <div>
      <h1>Home</h1>

      <div className="grid-col gap-1">
        {channels &&
          channels.map((channel) => (
            <Link
              to={`/channels/${channel.id}`}
              key={channel.id}
              className="grid-row align-left bg-light"
            >
              <img src={channel.image} style={{ height: "4rem" }}></img>
              <p className="text-bold px-1">{channel.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Home;
