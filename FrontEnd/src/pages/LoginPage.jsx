import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "../styles/login&register.css";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUserService({ email, password });

      const BearerToken = `Bearer ${token}`;

      login(BearerToken);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="center">
      <form onSubmit={handleForm}>
        <h1>Login</h1>
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
          <button className="btn">Login</button>
        </div>
        <div className="text">
          <Link to={'/register'}>Create account</Link>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </form>
    </section>
  );
};
