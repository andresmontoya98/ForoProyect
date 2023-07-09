import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLinkService, UpdateLinkService } from "../services";
import '../styles/editLink.css'

const UpdateLinkPage = () => {
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [updatedTitulo, setUpdatedTitulo] = useState("");
  const [updatedDescripcion, setUpdatedDescripcion] = useState("");
  const [updatePicture, setUpdatePicture] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getSingleLinkService(id, token);
        setUpdatedUrl(data.url);
        setUpdatedTitulo(data.titulo);
        setUpdatedDescripcion(data.description);
        setUpdatePicture(data.image)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const token = localStorage.getItem("token");
      
      await UpdateLinkService({ id, token, data });
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUrlChange = (e) => {
    setUpdatedUrl(e.target.value);
  };

  const handleTituloChange = (e) => {
    setUpdatedTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setUpdatedDescripcion(e.target.value);
  };

  return (
    <section className="editPublication">
      <h2>Editar Enlace</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Max 400 characters"
            maxLength={400}
            value={updatedUrl}
            onChange={handleUrlChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            maxLength={15}
            placeholder="Max 15 characters"
            value={updatedTitulo}
            onChange={handleTituloChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Descripción</label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            placeholder="Max 200 characters"
            maxLength={200}
            value={updatedDescripcion}
            onChange={handleDescripcionChange}
          />
        </fieldset>
        <fieldset className="imageField">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            name="picture"
            id="image"
            onChange={(e) => setUpdatePicture(e.target.files[0])}
          />
          {updatePicture && updatePicture instanceof File ? (
            <figure>
              <img
                src={URL.createObjectURL(updatePicture)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : null}
        </fieldset>
        <button className="btn" type="submit">Guardar Cambios</button>
        {error ? <p className="error">{error}</p> : null}
      </form>
    </section>
  );
};

export default UpdateLinkPage;
