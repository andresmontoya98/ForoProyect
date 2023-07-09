import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UpdatePasswordService } from "../services/index";
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/PopUp.css';
import '../styles/updatePassword.css'

export const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setShowModal(true);
  };

  const handleLogout = async () => {
    try {
      await UpdatePasswordService({ password });
      logout();
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <section className="updatePassword">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="password">Nueva Contraseña</label>
          <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
              type="button"
              className="ShowPasswordButton"
              onClick={toggleShowPassword}
            ><VisibilityIcon /></button>
          </div>  
        </fieldset>
        <fieldset>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <div className="confirmPasswordContainer">
          <input
            type={showPassword2 ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
              type="button"
              className="ShowPasswordButton"
              onClick={toggleShowPassword2}
            ><VisibilityIcon /></button>
          </div>
        </fieldset>
        <button className="btn">Cambiar Contraseña</button>
        {error && <p className="error">{error}</p>}
      </form>

      {showModal && (
        <div className="modalUpdate">
          <div className="modalText">
            <p>
              Al actualizar tu contraseña se procederá al cierre de la sesión y se te redirigirá a la página de Login.
            </p>
            <p>¿Deseas continuar?</p>
            <div className="modalbuttons">
              <button onClick={handleLogout}>Confirmar</button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
      <Link to="/update" className="btnUpdate">
        Volver a Actualizar Usuario
      </Link>
    </section>
  );
};
