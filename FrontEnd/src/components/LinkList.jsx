import { Element } from './Element';
import PropTypes from 'prop-types';
import '../styles/linkList.css'
import { Button } from '@mui/material';

export const LinkList = ({ links, removePost, handlePagination }) => {

    return links.length ? (
        <div className='listBtn'>
            <ul>
                {links.map((link, index) => {
                    return (
                        <li key={index} className='list'>
                            <Element maxLength={400} link={link} removePost={removePost} />
                        </li>
                    );
                })}

            </ul>
            <Button variant='contained' className='btnMore' color='button' onClick={handlePagination}>More</Button>
        </div>

    ) : (
        <p>No existen publicaciones...</p>
    )
};

LinkList.propTypes = {
    links: PropTypes.array,
    removePost: PropTypes.func,
    handlePagination: PropTypes.func,
}