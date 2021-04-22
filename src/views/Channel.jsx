import { useEffect, useState } from "react";
import { useParams } from "react-router";

import parseDate from "../util/parseDate";

function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels/" + id);
      const data = await response.json();
      setChannel(data);
    })();

    (async () => {
      const response = await fetch(
        `/api/v1/schedule?channel=${id}&date=2021-04-22`
      );
      const data = await response.json();
      for (let e of data) {
        e.starttimeutc = parseDate(e.starttimeutc);
      }
      setSchedule(data);
    })();
  }, [id]);

  if (!channel) return null;

  return (
    <div>
      <div className="grid-row justify-start align-center bg-light">
        <img src={channel.image} style={{ height: "4rem" }} alt=""></img>
        <div className="grid-row align-center bg-dark px-1 height-100">
          <p className="text-bold m-0">{channel.name}</p>
        </div>
        <div className="grid-row mx-1 gap-1">
          <p className="text-bold">Tablå</p>
          <p>Program</p>
        </div>
      </div>

      <div className="grid-col gap-1">
        {schedule &&
          schedule.map((episode, i) => (
            <div key={i} className="grid-col">
              <p className="m-0">
                {episode.starttimeutc.toLocaleString("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <div className="grid-row justify-start bg-light">
                <img
                  src={episode.imageurl}
                  style={{ height: "4rem" }}
                  alt=""
                ></img>
                <p className="text-bold px-1">{episode.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Channel;
