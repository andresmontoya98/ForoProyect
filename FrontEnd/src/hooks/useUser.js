import { useContext, useEffect, useState } from "react"
import { getUserService } from "../services";
import { AuthContext } from "../context/AuthContext";



export const useUser = (id) => {

    const { token } = useContext(AuthContext);

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const load = async () => {
            try {
                setLoading(true);

                const user = await getUserService(id, token);

                setUser(user);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        load();

    }, [id, token])
    return {
        user, error, loading
    }
}