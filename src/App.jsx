import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import firebase from "firebase/app";

import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Channel from "./views/Channel";
import Program from "./views/Program";

firebase.initializeApp({
  apiKey: "AIzaSyAk4xojxL8HubY9h84qVDNmpYAGbiPK0I8",
  authDomain: "radio-app-447d0.firebaseapp.com",
  projectId: "radio-app-447d0",
  storageBucket: "radio-app-447d0.appspot.com",
  messagingSenderId: "875457639595",
  appId: "1:875457639595:web:a4f08eab4d210e016c33ee",
  measurementId: "G-TTPW6EWVFD",
});

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Navbar />
          <Switch>
            <Route path="/channels/:id" component={Channel} />
            <Route path="/programs/:id" component={Program} />
            <Route path="/" component={Home} />
          </Switch>
        </QueryParamProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
