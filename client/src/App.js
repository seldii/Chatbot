import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Chatbot from "./components/Chatbot";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Route exact path="/" component={Landing}></Route>
        <Chatbot />
      </Router>
    </div>
  );
}

export default App;
