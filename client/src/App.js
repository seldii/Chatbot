import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Route exact path="/" component={Landing}></Route>
      </Router>
    </div>
  );
}

export default App;
