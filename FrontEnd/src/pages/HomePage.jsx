import { useLinks } from '../hooks/useLinks';
import { LinkList } from '../components/LinkList';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { NewPost } from '../components/NewPost';
import '../styles/homePage.css';

export const HomePage = () => {

    const { links, error, addPost, loading, removePost, handlePagination } = useLinks();
    const { user } = useContext(AuthContext);

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <>
            {user ?
                <div className='principal'>
                    <NewPost addPost={addPost} />
                    <section className='list'>
                        <h2>Publicaciones Recientes</h2>
                        <LinkList links={links} removePost={removePost} handlePagination={handlePagination} />
                    </section>

                </div> : null
            }
        </>

    )
}
