import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn }} className="App">
      <BrowserRouter basename="/radio-app">
        <QueryParamProvider ReactRouterRoute={Route}>
          <Navbar />
          <Switch>
            <Route path="/channels/:id" component={Channel} />
            <Route path="/programs/:id" component={Program} />
            <Route path="/" component={Home} />
          </Switch>
        </QueryParamProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
