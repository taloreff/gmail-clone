import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faGoldstar } from '@fortawesome/free-solid-svg-icons';

export function EmailStar({ email, handleStarClick, onUpdateEmail }) {

    return <span className='email-star' onClick={ev => {
        handleStarClick(ev)
        onUpdateEmail({ ...email, isStarred: !email.isStarred });
    }}>
        {email.isStarred ?
            <FontAwesomeIcon icon={faGoldstar} style={{ color: "#FFD43B", }} /> :
            <FontAwesomeIcon icon={faStar} style={{ color: "#a1a1a1", }} />}</span>
}

