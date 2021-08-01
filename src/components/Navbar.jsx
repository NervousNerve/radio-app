import { createContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";

import style from "./css/Navbar.module.css";

export const NavbarContext = createContext();

function Navbar() {
  const node = useRef();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleClickDocument = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      setShowUserMenu(false);
    };

    document.addEventListener("mousedown", handleClickDocument);
    return () => {
      document.removeEventListener("mousedown", handleClickDocument);
    };
  }, []);

  return (
    <nav>
      <NavbarContext.Provider value={{ setShowUserMenu }}>
        <div className={`${style.wrapper} bg-black color-white`} ref={node}>
          <div className={`${style.contents} px-1 container`}>
            <Link to="/" className={style.logo}>
              Radio<strong>App</strong>
            </Link>

            <div className="grid-row justify-end align-center gap-1">
              <button
                className={`font-size-lg text-center m-0 color-white ${style.navBtn}`}
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                }}
              >
                {showUserMenu ? (
                  <i className="fas fa-times" />
                ) : (
                  <i className="far fa-user" />
                )}
              </button>
            </div>

            {showUserMenu && <UserMenu />}
          </div>
        </div>
      </NavbarContext.Provider>
      <div className={style.spacer}></div>
    </nav>
  );
}

export default Navbar;
