import { Link } from "react-router-dom";

import style from "./css/Navbar.module.css";

function Navbar() {
  return (
    <div className="bg-black color-white">
      <div className={`${style.navbar} px-1 container`}>
        <Link to="/" className={style.logo}>
          Radio<strong>Logo</strong>
        </Link>
        <div className="grid-row justify-end">
          <p className="link color-white">Logga in</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
