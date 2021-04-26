import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import ChannelContextProvider from "./contexts/ChannelContext";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Navbar />
          <Switch>
            <Route path="/channels/:id">
              <ChannelContextProvider>
                <Channel />
              </ChannelContextProvider>
            </Route>
            <Route path="/programs/:id" component={Program}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
