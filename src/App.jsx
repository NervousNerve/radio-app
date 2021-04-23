import { BrowserRouter, Route } from "react-router-dom";

import ChannelContextProvider from "./contexts/ChannelContext";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";
import Episode from "./views/Episode";
import Categories from "./views/Categories";
import Category from "./views/Category";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home}></Route>
        <Route path="/channels/:id">
          <ChannelContextProvider>
            <Channel />
          </ChannelContextProvider>
        </Route>
        <Route path="/programs/:id" component={Program}></Route>
        <Route path="/episode/:id" component={Episode}></Route>
        <Route exact path="/categories" component={Categories}></Route>
        <Route path="/categories/:id" component={Category}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
