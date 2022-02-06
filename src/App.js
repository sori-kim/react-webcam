import React from "react";
import { Route, Switch } from "react-router-dom";
import Webcam from "./pages/Webcam";
import Home from "./pages/Home";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cam" component={Webcam} />
    </Switch>
  );
}

export default App;
