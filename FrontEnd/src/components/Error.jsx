import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../styles/notFound.css'

export const Error = ({ message }) => {
    return (
        <div className='page-container'>
            <section className='error-container'>
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <section className='second-container'>
                <h3 className='message'>{message}</h3>
                <Link className='link' to={'/login'}>Go to Login Page</Link>
            </section>

        </div>

    )
};


Error.propTypes = {
    message: PropTypes.string,
}