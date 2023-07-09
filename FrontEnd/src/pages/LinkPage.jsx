import { useParams } from "react-router-dom";
import useLink from "../hooks/useLink";
import { Error } from "../components/Error";
import { Element } from "../components/Element";
import { Comments } from "../components/Comments";
import useComments from "../hooks/useComments";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const LinkPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { link, loading, error } = useLink(id);
  const { addComment, removeComment, comments } = useComments(id)

  if (loading) return <p>loading publication...</p>;
  if (error) return <Error message={error} />;

  return (
    <>
      {user ?
        <section>
          <Element maxLength={400} link={link} />
          <Comments linkId={id} comments={comments} addComment={addComment} removeComment={removeComment} />
        </section> : null
      }
    </>
  );
};
