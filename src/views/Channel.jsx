import { createContext, useEffect, useState } from "react";
import { Route, useParams, withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import Schedule from "./ChannelSchedule";
import Programs from "./ChannelPrograms";
import Headerbar from "../components/Headerbar";

import { getChannel } from "../data/channels";

export const ChannelContext = createContext();

function Channel(props) {
  const { id } = useParams();
  const [channel, setChannel] = useState();

  useEffect(() => {
    getChannel(id).then((channel) => setChannel(channel));
  }, [id]);

  if (!channel) return null;

  const values = { channel };

  return (
    <ChannelContext.Provider value={values}>
      <Headerbar>
        <img
          src={channel.image}
          alt=""
          style={{ height: "var(--bar-height)" }}
        />

        <div className="grid-row align-center px-1 bg-dark">
          <p className="text-bold m-0">{channel.name}</p>
        </div>

        <div className="grid-row align-center mx-1 gap-1">
          <NavLink exact to={`/channels/${channel.id}`}>
            Tablå
          </NavLink>
          <NavLink exact to={`${props.match.url}/programs`}>
            Alla program
          </NavLink>
        </div>
      </Headerbar>

      <Route exact path={`/channels/:id`}>
        <Schedule />
      </Route>

      <Route path={`/channels/:id/programs`}>
        <Programs />
      </Route>
    </ChannelContext.Provider>
  );
}

export default withRouter(Channel);
