import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import UserMenu from "./UserMenu";

import style from "./css/Navbar.module.css";

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="bg-black color-white">
      <div className={`${style.navbar} px-1 container`}>
        <Link to="/" className={style.logo}>
          Radio<strong>Logo</strong>
        </Link>
        <div
          className="grid-row justify-end align-center gap-1 link color-white"
          onClick={() => {
            setShowUserMenu(!showUserMenu);
          }}
        >
          {user && <span>{user.firstName}</span>}

          <p className="font-size-lg m-0 text-center" style={{ width: "1em" }}>
            {!showUserMenu ? (
              <i className="far fa-user"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </p>
        </div>
      </div>
      {showUserMenu && <UserMenu />}
    </div>
  );
}

export default Navbar;
