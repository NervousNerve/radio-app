import { useContext } from "react";
import { Route, withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { ChannelContext } from "../contexts/ChannelContext";

import Schedule from "./ChannelSchedule";
import Programs from "./ChannelPrograms";

function Channel(props) {
  const { channel } = useContext(ChannelContext);

  if (!channel) return null;

  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <img src={channel.image} alt="" style={{ height: "4rem" }}></img>
        <div className="grid-row align-center bg-dark px-1 height-100">
          <p className="text-bold m-0">{channel.name}</p>
        </div>
        <div className="grid-row mx-1 gap-1">
          <NavLink exact to={`/channels/${channel.id}`}>
            Tablå
          </NavLink>
          <NavLink exact to={`${props.match.url}/programs`}>
            Alla program
          </NavLink>
        </div>
      </div>

      <Route exact path={`/channels/:id`}>
        <Schedule />
      </Route>

      <Route path={`/channels/:id/programs`}>
        <Programs />
      </Route>
    </div>
  );
}

export default withRouter(Channel);
