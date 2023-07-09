import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendPostService } from "../services";
import { PropTypes } from 'prop-types';
import '../styles/newLink.css';

export const NewPost = ({ addPost }) => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData(e.target);
            await sendPostService({ data, token });

            addPost(data);


            e.target.reset();
            setPicture(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="newPublication">
            <h2>Añadir Publicación</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="text">URL</label>
                    <input type="text" name="url" id="url" placeholder="Max 400 characters" maxLength={400} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="text">Título</label>
                    <input type="text" name="titulo" id="titulo" placeholder="Max 15 characters" maxLength={15} required />
                </fieldset>
                <fieldset>
                    <label>Descripción</label>
                    <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Max 200 characters"
                        maxLength={200}
                    />

                </fieldset>
                <fieldset className="image-field">
                    <input
                        type="file"
                        name="picture"
                        id="image"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <label htmlFor="image">Cargar imagen</label>
                    {picture ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(picture)}
                                style={{ width: "100px", borderRadius: '5px' }}
                                alt="Preview"
                            />
                        </figure>
                    ) : null}
                </fieldset>
                <button className="btn">Publicar</button>
                {error ? <p className="error">{error}</p> : null}
                {loading ? <p>publicando...</p> : null}
            </form>
        </section>
    );
};


NewPost.propTypes = {
    addPost: PropTypes.func,
}