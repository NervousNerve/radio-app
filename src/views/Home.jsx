import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import List from "../components/List";

function Home() {
  const history = useHistory();
  const [channels, setChannels] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels");
      const data = await response.json();
      setChannels(data);
    })();
  }, []);

  const handleClickItem = (item) => {
    history.push("/channels/" + item.id);
  };

  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <div className="grid-row mx-1 gap-1">
          <p className="text-bold m-0">Kanaler</p>
          <Link to="/categories">Kategorier</Link>
        </div>
      </div>

      {channels && (
        <List
          items={channels.map((channel) => {
            return {
              image: channel.image,
              text: channel.name,
              id: channel.id,
            };
          })}
          clickItem={handleClickItem}
        ></List>
      )}
    </div>
  );
}

export default Home;
