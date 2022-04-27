import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes> 
          <Route path="/main" element={<Main />} />
          <Route path="/Posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
