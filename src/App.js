import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Main from "./component/main";
import Signup from "./component/signup";
import Contract from "./component/contract";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contract" element={<Contract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
