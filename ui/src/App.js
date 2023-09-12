import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Home_Nav/Nav";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/Signup";
import Home from "./component/Home_Nav/Home";
import PrivateComponent from "./component/Home_Nav/PrivateComponent";
import Profile from "./component/Profile/Profile";
import MyTweetsSections from "./component/MyTweetsSection/MyTweetsSections";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/tweets" element={<MyTweetsSections />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
