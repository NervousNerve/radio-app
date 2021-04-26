import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import { ChannelContext } from "./Channel";

import parseDate from "../util/parseDate";
import ScheduleList from "../components/ScheduleList";
import ListItem from "../components/ListItem";

function Schedule() {
  const history = useHistory();
  const { id } = useParams();
  const [schedule, setSchedule] = useState();
  const { channel } = useContext(ChannelContext);
  const [dateStr, setDateStr] = useQueryParam("date");

  useEffect(() => {
    // Fetch schedule for this channel
    (async () => {
      let url = `/api/v1/schedule?channel=${id}&date=${dateStr}`;
      const response = await fetch(url);
      const data = await response.json();

      // Replace date strings actual Date objects
      for (let e of data) {
        e.starttimeutc = parseDate(e.starttimeutc);
        e.endtimeutc = parseDate(e.endtimeutc);
      }
      setSchedule(data);
    })();
  }, [id, dateStr]);

  if (!schedule) return null;

  return (
    <div className="grid-col gap-1 p-1 container">
      <div className="grid-row justify-center gap-1">
        <label>Datum:</label>
        <input
          type="date"
          defaultValue={new Date().toLocaleString("sv-SE", {
            dateStyle: "short",
          })}
          onChange={(e) => {
            setDateStr(e.target.value);
          }}
        ></input>
      </div>

      <ScheduleList>
        {schedule &&
          schedule
            .filter(
              (episode) =>
                episode.endtimeutc >= Date.parse(dateStr || new Date())
            )
            .map((episode, i) => (
              <ListItem
                key={i}
                thumbnail={episode.imageurl || channel.image}
                timestamp={episode.starttimeutc}
                onClick={() => {
                  history.push(`/programs/${episode.program.id}`);
                }}
              >
                <p className="text-bold m-0">{episode.title}</p>
              </ListItem>
            ))}
      </ScheduleList>
    </div>
  );
}

export default Schedule;
