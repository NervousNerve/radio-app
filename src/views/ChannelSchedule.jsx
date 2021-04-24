import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQueryParam } from "use-query-params";
import List from "../components/List";
import { ChannelContext } from "../contexts/ChannelContext";
import parseDate from "../util/parseDate";

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

      <List
        items={schedule
          .filter(
            (episode) => episode.endtimeutc >= Date.parse(dateStr || new Date())
          )
          .map((episode) => {
            return {
              image: episode.imageurl || channel.image,
              text: episode.title,
              id: episode.program.id,
              timestamp: episode.starttimeutc,
            };
          })}
        clickItem={(item) => {
          history.push("/programs/" + item.id);
        }}
      />
    </div>
  );
}

export default Schedule;
