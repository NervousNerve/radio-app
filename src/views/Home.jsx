import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Programs from "./Programs";
import Channels from "./Channels";
import Headerbar from "../components/Headerbar";

function Home() {
  return (
    <div>
      <Headerbar>
        <div className="grid-row gap-1 align-center">
          <NavLink to="/channels">Kanaler</NavLink>
          <NavLink to="/programs">Programs</NavLink>
        </div>
      </Headerbar>

      <Switch>
        <Route path="/programs" component={Programs} />
        <Route path="/channels" component={Channels} />
        <Route path="/">
          <Redirect to="/channels" />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
