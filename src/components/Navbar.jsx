import { Link } from "react-router-dom";

import style from "./css/Navbar.module.css";

function Navbar() {
  return (
    <div className="bg-black">
      <div className={`${style.navbar} px-1 container`}>
        <Link to="/" className={style.logo}>
          Radio<strong>Logo</strong>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
