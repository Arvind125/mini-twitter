import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Nav";
import Login from "./component/Login";
import SignUp from "./component/Signup";
import Home from "./component/Home";
import PrivateComponent from "./component/PrivateComponent";
import Profile from "./component/Profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
