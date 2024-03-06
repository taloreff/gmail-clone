import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { EmailStar } from './EmailStar';


export function EmailPreview({ email, onRemoveEmail, onUpdateEmail }) {

    const params = useParams()
    function handleStarClick(ev) {
        ev.preventDefault();
        onUpdateEmail({ ...email, isStarred: !email.isStarred })
    }

    function handleReadClick() {
        onUpdateEmail({ ...email, isRead: true })
    }

    const shortSubject = email.subject.length > 30 ? email.subject.substring(0, 30) + '...' : email.subject;
    const shortBody = email.body.length > 80 ? email.body.substring(0, 80) + '...' : email.body;

    const emailDate = new Date(email.sentAt);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let dateDisplay;
    if (emailDate.getMonth() + 1 === currentMonth && emailDate.getFullYear() === currentYear) {
        const hours = emailDate.getHours();
        const minutes = emailDate.getMinutes();
        dateDisplay = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    } else {
        const monthName = emailDate.toLocaleString('en', { month: 'short' });
        const monthNumber = emailDate.getMonth() + 1;
        dateDisplay = `${monthName} ${monthNumber}`;
    }


    return <article className={`email-preview ${email.isRead ? 'read' : 'unread'}`} >
        <div className="email">
            <EmailStar email={email} handleStarClick={handleStarClick} onUpdateEmail={onUpdateEmail} />
            <Link to={`/${params.mailStatus}/${email._id}`} onClick={handleReadClick} className="email-content">
                <span className='email-subject'><h4>{shortSubject}</h4></span>
                <span className='email-body'><h5>{shortBody}</h5></span>
            </Link>
        </div>
        <span className='email-date'>{dateDisplay}</span>
        <div className="email-actions">
            <span><button onClick={() => onRemoveEmail(email)}><FontAwesomeIcon icon={faTrashAlt} /></button></span>
            <span><button><FontAwesomeIcon icon={faEdit} /></button></span>
        </div>
    </article >
}

EmailPreview.propTypes = {
    email: PropTypes.object.isRequired,
    onRemoveEmail: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired
};