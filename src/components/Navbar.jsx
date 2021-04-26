import { useContext, useState } from "react";
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
        <div className="grid-row justify-end">
          <p
            className="link color-white font-size-lg"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
          >
            {user && <span>{user.firstName}</span>}{" "}
            {!showUserMenu ? (
              <i class="far fa-user"></i>
            ) : (
              <i class="fas fa-times"></i>
            )}
          </p>
        </div>
      </div>
      {showUserMenu && <UserMenu />}
    </div>
  );
}

export default Navbar;
