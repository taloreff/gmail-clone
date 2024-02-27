import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


export function EmailPreview({ email, onRemoveEmail, onUpdateEmail }) {
    return <article className="email-preview">
        <Link to={`/email/${email.id}`}>
            <div className="email">
                <span><img src="images/cleardot.gif" alt="Not starred" /></span>
                <span><h4>{email.subject}</h4></span>
                <span><h6>{email.body}</h6></span>
                <span><button onClick={() => onRemoveEmail(email.id)}>remove</button></span>
                <span><button onClick={() => onUpdateEmail(email)}>Update</button></span>
            </div>
        </Link>
    </article>
}

EmailPreview.propTypes = {
    email: PropTypes.array.isRequired,
    onRemoveEmail: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired
};