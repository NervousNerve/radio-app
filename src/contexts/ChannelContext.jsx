import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";

export const ChannelContext = createContext();

function ChannelContextProvider(props) {
  const { id } = useParams();
  const [channel, setChannel] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/channels/" + id);
      const data = await response.json();
      setChannel(data);
    })();
  }, [id]);

  const values = { channel };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
}

export default ChannelContextProvider;
