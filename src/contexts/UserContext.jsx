import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState();
  const [favoriteChannels, setFavoriteChannels] = useState();
  const [favoritePrograms, setFavoritePrograms] = useState();

  useEffect(() => {
    (async () => {
      // Check for user session
      const response = await fetch("/api/v1/users/whoami");
      const data = await response.json();

      if (!data) return;

      // Existing user session found. Log back in
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      // User logged out. Clear favorites
      setFavoriteChannels(null);
      setFavoritePrograms(null);
      return;
    }

    // User logged in. Load favorites
    loadFavoriteChannels();
    loadFavoritePrograms();
  }, [user]);

  const login = async (email, password) => {
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
  };

  const logout = async () => {
    const response = await fetch("/api/v1/users/logout");
    const data = await response.json();
    if (!data.success) return false;

    setUser(null);
    return true;
  };

  const loadFavoriteChannels = async () => {
    try {
      const response = await fetch("/api/v1/favorites/channels");
      const data = await response.json();
      setFavoriteChannels(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFavoritePrograms = async () => {
    try {
      const response = await fetch("/api/v1/favorites/programs");
      const data = await response.json();
      setFavoritePrograms(data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveFavoriteChannel = async (id) => {
    const response = await fetch("/api/v1/favorites/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!data.success) {
      console.error(data);
      return;
    }
    setFavoriteChannels([...favoriteChannels, id]);
  };

  const saveFavoriteProgram = async (id) => {
    const response = await fetch("/api/v1/favorites/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!data.success) {
      console.error(data);
      return;
    }
    setFavoritePrograms([...favoritePrograms, id]);
  };

  const values = {
    user,
    login,
    logout,
    favoriteChannels,
    favoritePrograms,
    saveFavoriteChannel,
    saveFavoriteProgram,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
