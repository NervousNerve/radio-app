import { useContext, useEffect } from "react";
import { Route, NavLink, useHistory } from "react-router-dom";

import Headerbar from "../components/Headerbar";
import { UserContext } from "../contexts/UserContext";
import UserChannels from "./UserChannels";
import UserPrograms from "./UserPrograms";

function User() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) history.push("/");
  }, [history, user]);

  if (!user) return null;

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
