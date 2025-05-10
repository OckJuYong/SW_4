import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Main from "./component/main";
import Signup from "./component/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
