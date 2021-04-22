import { BrowserRouter, Route } from "react-router-dom";

import Home from "./views/Home";
import Channel from "./views/Channel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/channels/:id" component={Channel}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
