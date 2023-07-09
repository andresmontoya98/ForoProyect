import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../context/AuthContext";
import { createCommentService, deleteCommentService } from "../services/index";
import { Link, useNavigate } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";

import '../styles/comments.css'

export const Comments = ({ linkId, comments, addComment, removeComment }) => {

  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const newComment = await createCommentService(linkId, newCommentText, token);
      addComment(newComment);
      setNewCommentText("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    try {
      await deleteCommentService({ id, token });
      if (removeComment) {
        removeComment(id);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="comments">
      <h2 className="title">Comments</h2>
      <form className="form" onSubmit={handleCommentSubmit}>
        <input
          className="input"
          type="text"
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder="Max 500 characters"
          maxLength={500}
        />
        <button className="submit-btn" type="submit">Submit</button>
        {loading ? <p className="loading">Loading comments...</p> : null}
        {error ? <p className="error">{error}</p> : null}
      </form>
      {comments.length > 0 ?
        (
          <ul className="list">
            {comments.map((comment, index) => (
              <li className="item" key={index}> 
                  <p className="text">{comment.comment_text}</p>
                  <div className="icon">
                  {comment.user_id === user.id && (
                    <DeletePopUp
                      onConfirm={() => deleteComment(comment.id)}
                      message="¿Estás seguro de que quieres eliminar este comentario?"
                    />
                  )}
                </div>
                  <p className="text"><Link className="owner" to={`/user/${comment.user_id}`}>{comment.username}</Link> On{" "}
                    {new Date(comment.created_at).toUTCString()}</p>
                  
                {error ? <p className="error">{error}</p> : null}
              </li>
            ))}
          </ul>
        )
        : (
          <p className="no-comments">No existen comentarios para este link...</p>
        )}
    </div>
  );
};

Comments.propTypes = {
  linkId: PropTypes.string,
  comments: PropTypes.array,
  addComment: PropTypes.func,
  removeComment: PropTypes.func,
}