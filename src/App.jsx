import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import UserContextProvider from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserContextProvider>
            <Navbar />
            <Switch>
              <Route path="/channels/:id" component={Channel} />
              <Route path="/programs/:id" component={Program} />
              <Route path="/" component={Home} />
            </Switch>
          </UserContextProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
