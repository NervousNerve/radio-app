import { createContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState();

  const login = async function (email, password) {
    try {
      const cred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("Logged in as:", cred.user.email);
      setUser(cred.user);
    } catch (error) {
      return { error: error.code };
    }
  };

  const logout = async function () {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
