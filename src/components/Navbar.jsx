import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      className="grid-row align-center px-1 bg-black"
      style={{ height: "3rem" }}
    >
      <Link to="/" className="color-white" style={{ fontSize: "1.5rem" }}>
        Radio<strong>Logo</strong>
      </Link>
    </div>
  );
}

export default Navbar;
