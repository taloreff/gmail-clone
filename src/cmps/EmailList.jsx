import PropTypes from 'prop-types';
import { EmailPreview } from "./EmailPreview";
// import { Outlet } from 'react-router';
import React from 'react';

export function EmailList({ emails, onRemoveEmail, onUpdateEmail, handleEmailClick }) {
    return (
        <React.Fragment>
            <ul className="emails-list">
                {emails ? emails.map(email => <li key={email._id} onClick={() => handleEmailClick(email._id)}>
                    <EmailPreview email={email}
                        onRemoveEmail={onRemoveEmail}
                        onUpdateEmail={onUpdateEmail} />
                </li>) : <p>No emails found</p>}
            </ul>
            {/* <Outlet /> */}
        </React.Fragment>
    )
}

EmailList.propTypes = {
    emails: PropTypes.array.isRequired,
    onRemoveEmail: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired,
    handleEmailClick: PropTypes.func.isRequired
};
