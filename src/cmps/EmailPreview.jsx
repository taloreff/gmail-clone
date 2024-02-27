import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';


export function EmailPreview({ email, onRemoveEmail, onUpdateEmail }) {

    function handleStarClick(ev) {
        ev.preventDefault();
        onUpdateEmail({ ...email, isStarred: !email.isStarred })
    }

    const shortSubject = email.subject.length > 30 ? email.subject.substring(0, 30) + '...' : email.subject;
    const shortBody = email.body.length > 80 ? email.body.substring(0, 80) + '...' : email.body;

    return <article className="email-preview">
        <Link to={`/email/${email._id}`}>
            <div className="email">
                <span className='email-star' onClick={ev => handleStarClick(ev)}>
                    {email.isStarred ?
                        <FontAwesomeIcon icon={faStar} /> :
                        <FontAwesomeIcon icon={faStar} style={{ "--fa-primary-color": "#ffdd00", "--fa-secondary-color": "#ffdd00", "--fa-secondary-opacity": "0.7", }} />}</span>
                <span><h4>{shortSubject}</h4></span>
                <span><h6>{shortBody}</h6></span>
            </div>
        </Link>
        <div className="email-actions">
            <span><button onClick={() => onRemoveEmail(email._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></span>
            <span><button><FontAwesomeIcon icon={faEdit} /></button></span>
        </div>
    </article>
}

EmailPreview.propTypes = {
    email: PropTypes.array.isRequired,
    onRemoveEmail: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired
};