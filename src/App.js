import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard/List/Dashboard";
import CoinDetails from "./component/Dashboard/List/CoinDetails";
import Intropage from "./component/intro/Intropage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Intropage/>}/>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
