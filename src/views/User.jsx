import { Route, NavLink, Redirect, Switch } from "react-router-dom";

import Headerbar from "../components/Headerbar";
import UserChannels from "./UserChannels";
import UserPrograms from "./UserPrograms";

function User() {
  return (
    <div>
      <Headerbar>
        <div className="grid-row align-center px-1 bg-dark">
          <p className="text-bold m-0">Min sida</p>
        </div>
        <div className="grid-row align-center gap-1 px-1">
          <NavLink to="/user/channels">Kanaler</NavLink>
          <NavLink to="/user/programs">Program</NavLink>
        </div>
      </Headerbar>

      <Switch>
        <Route path="/user/programs" component={UserPrograms} />
        <Route path="/user/channels" component={UserChannels} />
        <Route path="/user">
          <Redirect to="/user/channels" />
        </Route>
      </Switch>
    </div>
  );
}

export default User;
