import { useContext } from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "../styles/login&register.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      //Con este trozo de codigo se logea al usuario despues de registrarse
      const response = await registerUserService({ username, email, password });
      const BearerToken = `Bearer ${response}`;
      login(BearerToken);
      navigate("/");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="center">
      <form onSubmit={handleForm}>
        <h1>Register</h1>
        <fieldset className="inputbox">
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="label" htmlFor="username">Username</label>
        </fieldset>

        <fieldset className="inputbox">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="email">Email</label>
        </fieldset>

        <fieldset className="inputbox">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label" htmlFor="password">Password</label>
        </fieldset>
        <div className="inputbox">
          <button className="btn">Sing Up</button>
        </div>
        <div className="text">
          <Link to={'/login'}>Sign In</Link>
        </div>

        {error ? <p className="error">{error}</p> : null}
      </form>
    </section>
  );
};

