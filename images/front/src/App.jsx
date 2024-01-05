import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Header from "./components/header/Header";


import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
