import { Link } from "react-router-dom";

import style from "./css/Navbar.module.css";

function Navbar() {
  return (
    <div className={`${style.navbar} px-1 bg-black`}>
      <Link to="/" className={style.logo}>
        Radio<strong>Logo</strong>
      </Link>
    </div>
  );
}

export default Navbar;
