import { BrowserRouter, Route } from "react-router-dom";

import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
