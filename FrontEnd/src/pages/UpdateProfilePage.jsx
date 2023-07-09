import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UpdateUserService, getMyDataService } from "../services/index";
import '../styles/updateProfile.css';
import '../styles/PopUp.css';

export const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMyDataService(token);
                setUsername(userData.username);
                setEmail(userData.email);
                setDescription(userData.description);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, [token]);

    const handleForm = async (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleLogout = async () => {
        try {
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("description", description);

            if (picture) {
                data.append("picture", picture);
            }

            await UpdateUserService({ token, data });
            logout();
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="editProfile">
            <h2>Actualizar Usuario</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Max 200 character"
                        maxLength={200}
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </fieldset>
                <fieldset className="imageField">
                    <label htmlFor="image">Avatar</label>
                    <input
                        type="file"
                        name="picture"
                        id="image"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    {picture ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(picture)}
                                style={{ width: "100px" }}
                                alt="Preview"
                            />
                        </figure>
                    ) : null}
                </fieldset>
                <button className="btn">Actualizar</button>
                {error ? <p className="error">{error}</p> : null}
            </form>
            {showModal && (
                <div className="modalUpdate">
                    <div className="modalText">
                        <p>Al actualizar tus datos se procederá al cierre de la sesión y se te redirigirá a la página de Login.</p>
                        <p>¿Deseas continuar?</p>
                        <div className="modalbuttons">
                            <button onClick={handleLogout}>Confirmar</button>
                            <button onClick={() => setShowModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
            <Link to="/user/password" className="btnPassword">Cambiar Contraseña</Link>
        </section>
    );
};
