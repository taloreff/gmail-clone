import { EmailPreview } from "./EmailPreview";
import React, { useEffect, useState } from 'react';

export function EmailList({ emails, onRemoveEmail, onUpdateEmail, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);

    function onSubmitFilter(ev) {
        ev.preventDefault();
        onSetFilter(filterByToEdit);
    }

    function handleFilterChange(e) {
        let { value } = e.target;
        let filter = {}
        if (value === 'read') {
            filter = { isRead: true }
        }
        else if (value === 'unread') {
            filter = { isRead: false }
        }
        else {
            filter = { isRead: null }
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ...filter }));
    }
    return (
        <React.Fragment>
            <ul className="emails-list">
                <form className='action-bar' onSubmit={onSubmitFilter}>
                    <input type="checkbox" />
                    <select
                        className='select-dropdown'
                        name="status"
                        defaultValue="all"
                        onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                </form>
                {emails ? emails.map(email => <li key={email._id}>
                    <EmailPreview email={email}
                        onRemoveEmail={onRemoveEmail}
                        onUpdateEmail={onUpdateEmail} />
                </li>) : <p>No emails found</p>}
            </ul>
        </React.Fragment>
    )
}


