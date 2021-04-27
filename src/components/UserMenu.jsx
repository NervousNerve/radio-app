import { useContext, useState } from "react";

import { UserContext } from "../contexts/UserContext";

import style from "./css/UserMenu.module.css";

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
    <div className={`px-1 pb-1 container`}>
      {!user && (
        <form
          className={`grid-col gap-1 ${style.userMenu}`}
          onSubmit={handleSubmit}
        >
          <div className="grid-col">
            <label htmlFor="email" className="mb-05">
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
            <label htmlFor="password" className="mb-05">
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

          <div className="grid-col gap-05">
            <button type="submit" className="bg-light color-white">
              Logga in
            </button>

            {loginFailed && (
              <span className="text-center color-error">
                Inloggning misslyckades!
              </span>
            )}

            <span className="font-size-sm text-center">
              Registrera användare
            </span>
          </div>
        </form>
      )}

      {user && (
        <div className={`${style.userMenu} grid-col`}>
          <button
            className="bg-light color-white"
            onClick={() => {
              logout();
            }}
          >
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
