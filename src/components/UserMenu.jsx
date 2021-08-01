import { useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { NavbarContext } from "./Navbar";

import style from "./css/UserMenu.module.css";

function UserMenu() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setShowUserMenu } = useContext(NavbarContext);

  return (
    <form
      className={`${style.userMenu} grid-col gap-05`}
      onSubmit={(e) => {
        e.preventDefault();
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((cred) => {
            console.log(cred.user);
          })
          .finally(() => {
            setEmail("");
            setPassword("");
            setShowUserMenu(false);
          });
      }}
    >
      <div>
        <label htmlFor="">Email:</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Lösenord:</label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

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
