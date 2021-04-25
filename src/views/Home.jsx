import { NavLink, Route } from "react-router-dom";

import Programs from "./Programs";
import Channels from "./Channels";
import Headerbar from "../components/Headerbar";

function Home() {
  return (
    <div>
      <Headerbar>
        <div className="grid-row mx-1 gap-1">
          <NavLink exact to="/">
            Program
          </NavLink>
          <NavLink exact to="/channels">
            Kanaler
          </NavLink>
        </div>
      </Headerbar>

      <Route exact path={"/"}>
        <Programs />
      </Route>

      <Route path={`/channels`}>
        <Channels />
      </Route>
    </div>
  );
}

export default Home;
