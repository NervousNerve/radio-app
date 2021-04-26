import { useContext, useState } from "react";

import { UserContext } from "../contexts/UserContext";
import style from "./css/Login.module.css";

function UserMenu() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginFailed, setLoginFailed] = useState(false);

  const { user, login, logout } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginFailed(false);

    if (!login(email, password)) {
      setLoginFailed(true);
      return;
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container px-1 pb-1">
      {!user && (
        <form className="grid-col gap-1" onSubmit={handleSubmit}>
          <div className="grid-col">
            <label for="email" className="mb-05">
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="grid-col">
            <label for="password" className="mb-05">
              Lösenord:
            </label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>

          <button type="submit">Logga in</button>

          {loginFailed && (
            <span className="text-center color-error">
              Inloggning misslyckades!
            </span>
          )}

          <span className="font-size-sm text-center">Registrera användare</span>
        </form>
      )}

      {user && (
        <button
          className="bg-light color-white"
          onClick={() => {
            logout();
          }}
        >
          Logga ut
        </button>
      )}
    </div>
  );
}

export default UserMenu;
