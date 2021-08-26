import { useState, useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { NavbarContext } from "./Navbar";

import style from "./css/UserMenu.module.css";

function UserMenu() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const { login } = useContext(AuthContext);

  const { setShowUserMenu } = useContext(NavbarContext);

  return (
    <form
      className={`${style.userMenu} grid-col gap-05 p-0 pb-1 px-1`}
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result?.error) {
          setErrorMsg("Something went wrong");
          return;
        }
        setEmail("");
        setPassword("");
        setShowUserMenu(false);
      }}
    >
      <div>
        <label htmlFor="">Email:</label>
        <input
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMsg();
          }}
        />
      </div>

      <div>
        <label htmlFor="">Lösenord:</label>
        <input
          type="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg();
          }}
        />
      </div>

      {errorMsg && (
        <p
          className={`${style.errorMsg} bg-error font-size-sm m-0 text-center`}
        >
          {errorMsg}
        </p>
      )}

      <div>
        <button className="bg-dark color-white text-bold">Logga in</button>
        <a href="/" className="color-white font-size-sm text-center">
          Ny användare?
        </a>
      </div>
    </form>
  );
}

export default UserMenu;
