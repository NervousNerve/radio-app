import { useContext } from "react";
import { useHistory } from "react-router";

import Headerbar from "../components/Headerbar";
import { UserContext } from "../contexts/UserContext";

import style from "./css/Register.module.css";

function Register() {
  const history = useHistory();
  const { register, login } = useContext(UserContext);

  const handleChange = () => {
    const email1 = document.querySelector("#email1");
    const email2 = document.querySelector("#email2");
    if (email1.value === email2.value) email2.setCustomValidity("");
    else email2.setCustomValidity("Email does not match!");

    const password1 = document.querySelector("#password1");
    const password2 = document.querySelector("#password2");
    if (password1.value === password2.value) password2.setCustomValidity("");
    else password2.setCustomValidity("Password does not match!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      email: document.querySelector("#email1").value,
      password: document.querySelector("#password1").value,
    };

    const result = await register(user);

    if (result) {
      await login(user.email, user.password);
      history.push("/");
    }
  };

  return (
    <div>
      <Headerbar>
        <div className="grid-row align-center px-1 bg-dark">
          <h1 className="font-size-md">Registrera användare</h1>
        </div>
      </Headerbar>

      <div className={`grid-row gap-1 p-1 container ${style.register}`}>
        <form className="grid-col gap-1" onSubmit={handleSubmit}>
          <div className="grid-col gap-05 p-05 bg-light">
            <div className="grid-col">
              <label htmlFor="firstName">Förnamn:</label>
              <input id="firstName" type="text" required />
            </div>

            <div className="grid-col">
              <label htmlFor="lastName">Efternamn:</label>
              <input id="lastName" type="text" required />
            </div>
          </div>

          <div className="grid-col gap-05 p-05 bg-light">
            <div className="grid-col">
              <label htmlFor="email1">Email:</label>
              <input
                id="email1"
                type="email"
                required
                onChange={handleChange}
              />
            </div>

            <div className="grid-col">
              <label htmlFor="email2">Bekräfta email:</label>
              <input
                id="email2"
                type="email"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-col gap-05 p-05 bg-light">
            <div className="grid-col">
              <label htmlFor="password1">Lösenord:</label>
              <input
                id="password1"
                type="password"
                required
                onChange={handleChange}
              />
            </div>

            <div className="grid-col">
              <label htmlFor="password2">Bekräfta lösenord:</label>
              <input
                id="password2"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Registrera</button>
        </form>

        <div
          className="hide show-md"
          style={{
            backgroundImage: "url(https://picsum.photos/400/600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Register;
