/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getAllLinksService, getLinksByIdService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useLinks = (id) => {

    const { token } = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const limit = 2; //Cantidad de publiaciones por página

    const loadLinks = async (offset) => {
        try {
            setLoading(true);

            const data = id
                ? await getLinksByIdService(id, token, limit, offset)
                : await getAllLinksService(token, limit, offset);

            setLinks((links) => [...links, ...data]);
            setOffset((prevOffset) => prevOffset + limit);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadLinks(offset);
    }, [id, token]);

    const handlePagination = async () => {
        await loadLinks(offset);
    }

    const addPost = async (data) => {
        setLinks((links) => [data, ...links]);
        setLinks([]);
        await setOffset(0);
        await loadLinks(0);

    };

    const removePost = async (id) => {
        setLinks(links.filter((link) => link.id !== id));
        setLinks([]);
        await setOffset(0);
        await loadLinks(0);
    };


    return { links, error, addPost, removePost, loading, handlePagination };
};
