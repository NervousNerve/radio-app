import { useEffect, useRef, createContext } from "react";
import { Link } from "react-router-dom";

import style from "./css/Navbar.module.css";

export const NavbarContext = createContext();

function Navbar() {
  const node = useRef();

  useEffect(() => {
    const handleClickDocument = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
    };

    document.addEventListener("mousedown", handleClickDocument);
    return () => {
      document.removeEventListener("mousedown", handleClickDocument);
    };
  }, []);

  return (
    <div className="bg-black color-white" ref={node}>
      <NavbarContext.Provider>
        <div className={`${style.navbar} px-1 container`}>
          <Link to="/" className={style.logo}>
            Radio<strong>App</strong>
          </Link>
        </div>
      </NavbarContext.Provider>
    </div>
  );
}

export default Navbar;
