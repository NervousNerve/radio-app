import { useState, useContext, useEffect, useRef, createContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import UserMenu from "./UserMenu";

import style from "./css/Navbar.module.css";

export const NavbarContext = createContext();

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useContext(UserContext);
  const node = useRef();

  useEffect(() => {
    const handleClickDocument = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      // Clicked outside Navbar
      setShowUserMenu(false);
    };

    document.addEventListener("mousedown", handleClickDocument);
    return () => {
      document.removeEventListener("mousedown", handleClickDocument);
    };
  }, []);

  const values = { setShowUserMenu };

  return (
    <div className="bg-black color-white" ref={node}>
      <NavbarContext.Provider value={values}>
        <div className={`${style.navbar} px-1 container`}>
          <Link
            to="/"
            className={style.logo}
            onClick={() => {
              setShowUserMenu(false);
            }}
          >
            Radio<strong>Logo</strong>
          </Link>
          <div
            className="grid-row justify-end align-center gap-1 link color-white"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
          >
            {user && <span>{user.firstName}</span>}

            <p
              className="font-size-lg m-0 text-center"
              style={{ width: "1em" }}
            >
              {!showUserMenu ? (
                <i className="far fa-user"></i>
              ) : (
                <i className="fas fa-times"></i>
              )}
            </p>
          </div>
        </div>
        {showUserMenu && <UserMenu />}
      </NavbarContext.Provider>
    </div>
  );
}

export default Navbar;
