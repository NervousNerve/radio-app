import { NavLink, Route } from "react-router-dom";

import Programs from "./Programs";
import Channels from "./Channels";

function Home() {
  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <div className="grid-row mx-1 gap-1">
          <NavLink exact to="/">
            Program
          </NavLink>
          <NavLink exact to="/channels">
            Kanaler
          </NavLink>
        </div>
      </div>

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
