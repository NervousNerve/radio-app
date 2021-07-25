import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import UserContextProvider from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";
import User from "./views/User";
import Register from "./views/Register";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  if (isLoggedIn === undefined) return null;

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn }} className="App">
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserContextProvider>
            <Navbar />
            <Switch>
              <Route path="/channels/:id" component={Channel} />
              <Route path="/programs/:id" component={Program} />
              {!isLoggedIn && <Route path="/register" component={Register} />}
              {isLoggedIn && <Route path="/user" component={User} />}
              <Route path="/" component={Home} />
            </Switch>
          </UserContextProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
