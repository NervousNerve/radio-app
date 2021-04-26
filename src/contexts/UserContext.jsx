import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/users/whoami");
      const data = await response.json();

      if (!data) return;

      setUser(data);
    })();
  }, []);

  const login = (email, password) => {
    (async () => {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!data.success) return false;
      setUser(data.user);
      return true;
    })();
  };

  const logout = () => {
    (async () => {
      const response = await fetch("/api/v1/users/logout");
      const data = await response.json();
      if (!data.success) return false;
      setUser(null);
      return true;
    })();
  };

  const values = { user, login, logout };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
