/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { getCommentsByLinkIdService } from '../services';
import { AuthContext } from "../context/AuthContext";

const useComments = (linkId) => {

    const { token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadComments = async () => {
        try {
            setLoading(true);

            const data = await getCommentsByLinkIdService(linkId, token);
            await setComments(data);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments()
    }, [linkId, token]);

    const addComment = (data) => {
        setComments((comments) => [data, ...comments]);
        loadComments();
    }

    const removeComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
        loadComments();
    };

    return { comments, addComment, removeComment, loading, error };
};

export default useComments;