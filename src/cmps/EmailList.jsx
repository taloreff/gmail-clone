import PropTypes from 'prop-types';
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
    return (
        <ul className="emails-list">
            {emails.map(email => <li key={email._id}>
                <EmailPreview email={email}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail} />
            </li>)}
        </ul>
    )
}

EmailList.propTypes = {
    emails: PropTypes.array.isRequired,
    onRemoveEmail: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired
};
