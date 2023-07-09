import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePostService } from "../services";
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Vote } from "./Vote";
import imageDefault from '../assets/default.jpg';
import '../styles/linkList.css';
import { DeletePopUp } from "./DeletePopUp";

export const Element = ({ link, removePost }) => {

    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const [error, setError] = useState("");

    const imageSrc = link.image ? `http://localhost:3000/${link.image}` : imageDefault;

    const handleConfirmDelete = () => {
        deletePost(link.id);
    }

    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            if (removePost) {
                removePost(id);
            } else {
                navigate(`/`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article className="element">
            <Box className='titleImage'>
                <Typography><Link className="linkTitle" to={`/link-detail/${link.id}`}>{link.titulo}</Link></Typography>
                <img src={imageSrc} alt="image" />
            </Box>
            <Box className='rest'>
                <p className="url" maxLength={400}>{link.url}</p>
                <p className="descripcion">{link.description}</p>
                <p className="create">
                    <Link className="owner" to={`/user/${link.user_id}`}>{link.username}</Link> On{" "}
                    {new Date(link.created_at).toUTCString()}
                </p>
                <Box>
                    <Vote linkId={link.id} initialValue={parseInt(link.media)} />

                </Box>

                {user && user.id === link.user_id ? (
                    <section className="icons">
                        <Link to={`/links/edit/${link.id}`}>
                            <EditIcon className="ediIcon" />
                        </Link>
                        <DeletePopUp className='deleteIcon' onConfirm={handleConfirmDelete} 
                        message="¿Estás seguro de que quieres eliminar esta publicación?"
                        />

                        {error ? <p className="error">{error}</p> : null}
                    </section>
                ) : null}
            </Box>

        </article>
    );
};

Element.propTypes = {
    link: PropTypes.object,
    removePost: PropTypes.func,
}
