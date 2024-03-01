import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

export function EmailStar({ email, handleStarClick, onUpdateEmail }) {

    return <span className='email-star' onClick={ev => {
        handleStarClick(ev)
        onUpdateEmail({ ...email, isStarred: !email.isStarred });
    }}>
        {email.isStarred ?
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /> :
            <FontAwesomeIcon icon={faStar} />}</span>
}

EmailStar.propTypes = {
    handleStarClick: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired
};