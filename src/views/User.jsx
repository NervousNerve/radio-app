import { Route, NavLink } from "react-router-dom";

import Headerbar from "../components/Headerbar";
import UserChannels from "./UserChannels";
import UserPrograms from "./UserPrograms";

function User() {
  return (
    <div>
      <Headerbar>
        <div className="grid-row align-center bg-dark px-1 height-100">
          <p className="text-bold m-0">Min sida</p>
        </div>
        <div className="grid-row mx-1 gap-1">
          <NavLink exact to="/user/channels">
            Kanaler
          </NavLink>
          <NavLink exact to="/user/programs">
            Program
          </NavLink>
        </div>
      </Headerbar>

      <Route path="/user/channels" component={UserChannels} />
      <Route path="/user/programs" component={UserPrograms} />
    </div>
  );
}

export default User;
