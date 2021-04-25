import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQueryParam } from "use-query-params";

import { ChannelContext } from "../contexts/ChannelContext";
import parseDate from "../util/parseDate";
import List from "../components/List";
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

      // Replace date strings like "/Date(1619215200000)/" with corresponding Date objects
      for (let e of data) {
        e.starttimeutc = parseDate(e.starttimeutc);
        e.endtimeutc = parseDate(e.endtimeutc);
      }
      setSchedule(data);
    })();
  }, [id, dateStr]);

  if (!schedule) return null;

  return (
    <div className="grid-col gap-1 p-1">
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

      <List>
        {schedule &&
          schedule
            .filter(
              (episode) =>
                episode.endtimeutc >= Date.parse(dateStr || new Date())
            )
            .map((episode, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  // Go to program page
                  history.push(`/programs/${episode.program.id}`);

                  // Go to episode page
                  // history.push(`/programs/${episode.program.id}?episode=${episode.episodeid}`);
                }}
              >
                <img
                  src={episode.imageurl || channel.image}
                  style={{ width: "4rem" }}
                  alt=""
                />
                <p className="text-bold px-1">{episode.title}</p>
              </ListItem>
            ))}
      </List>
    </div>
  );
}

export default Schedule;
