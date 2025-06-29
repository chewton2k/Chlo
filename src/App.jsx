  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PicturePage from "./pages/PicturePage.jsx";
import HomePage from "./pages/Home.jsx";


function App() {
  return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/pictures' element={<PicturePage/>}> </Route>
            </Routes>
        </Router>
  );
}

export default App;