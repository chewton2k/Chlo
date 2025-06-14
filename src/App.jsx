import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PicturePage from "./pages/PicturePage.jsx";
import Maze from "./components/Maze.jsx";
import HomePage from "./pages/Home.jsx";
import VillagePage from "./pages/VillagePage.jsx";

function App() {
  return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/pictures' element={<PicturePage/>}> </Route>
                <Route path='/maze' element={<Maze/>}> </Route>
                <Route path='/village' element={<VillagePage/>}> </Route>
            </Routes>
        </Router>
  );
}

export default App;