import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import List from "../../components/List";
import { ChannelContext } from "../../contexts/ChannelContext";
import parseDate from "../../util/parseDate";

function Schedule() {
  const history = useHistory();
  const { id } = useParams();
  const [schedule, setSchedule] = useState();
  const { channel } = useContext(ChannelContext);

  useEffect(() => {
    // Fetch schedule for this channel
    (async () => {
      const response = await fetch(`/api/v1/schedule?channel=${id}`);
      const data = await response.json();

      // Replace date strings like "/Date(1619215200000)/" with corresponding Date objects
      for (let e of data) {
        e.starttimeutc = parseDate(e.starttimeutc);
        e.endtimeutc = parseDate(e.endtimeutc);
      }
      setSchedule(data);
    })();
  }, [id]);

  if (!schedule) return null;

  return (
    <List
      items={schedule
        .filter((episode) => episode.endtimeutc >= Date.now())
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
  );
}

export default Schedule;
