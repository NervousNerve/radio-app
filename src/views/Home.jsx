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
            Kanaler
          </NavLink>
          <NavLink exact to="/programs">
            Programs
          </NavLink>
        </div>
      </Headerbar>

      <Route exact path={"/"}>
        <Channels />
      </Route>

      <Route path={`/programs`}>
        <Programs />
      </Route>
    </div>
  );
}

export default Home;
