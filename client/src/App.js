import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import SuccessfulLogin from './Pages/SuccessfulLogin';
import Welcome from "./Pages/Welcome";
import UserLogin from './Pages/UserLogin';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Welcome} exact />
      <Route path="/login" component={UserLogin} exact/>
      <Route path="/success" component={SuccessfulLogin} exact/>
    </div>
  );
}

export default App;
