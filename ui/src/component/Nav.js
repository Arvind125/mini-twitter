import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const user = localStorage.getItem("userId");
  // const user = true;
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        alt="logo"
        src="data:image/png;base64,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"
      />

      <p className="nav-title">My mini Twitter</p>
      {user ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/peoples">Peoples</Link>
          </li> */}
          <li>
            <Link to="/tweets">Tweets</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>

          <li>
            <Link to="/me">Profile</Link>
          </li>

          <li>
            <Link to="/login" onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
