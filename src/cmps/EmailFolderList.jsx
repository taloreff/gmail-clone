import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import path from '../services/image-path';

export function EmailFolderList({ filterBy, updateSearchParams, emails }) {
    const [isHovered, setIsHovered] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const params = useParams()
    const calculateUnreadCount = () => {
        const unreadCountEmails = params.mailStatus === 'inbox'
            ? emails.filter(email => !email.isRead)
            : [];
        setUnreadCount(unreadCountEmails.length);
    };

    useEffect(() => {
        calculateUnreadCount();
    }, [emails]);
    const navigationLinks = [
        { to: '/inbox', name: 'Inbox', icon: path.inbox },
        { to: '/sent', name: 'Sent', icon: path.sent },
        { to: '/starred', name: 'Starred', icon: path.starred },
        { to: '/drafts', name: 'Drafts', icon: path.drafts },
        { to: '/trash', name: 'Trash', icon: path.trash },
    ];


    return (
        <div
            className='email-folder-list'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="compose-btn" onClick={() => updateSearchParams({ ...filterBy, compose: 'new' })}>
                <img height={20} width={20} src={path.edit} />
                {isHovered && <span>&nbsp;Compose</span>}
            </button>
            <nav>
                {navigationLinks.map((status, index) => (
                    <NavLink key={index} to={status.to}>
                        <span className='folder-image'>
                            <img height={20} width={20} src={status.icon} alt={status.name} />
                        </span>
                        {isHovered && <span>{status.name}</span>}
                        {isHovered && status.name === 'Inbox' && <span className='unread-count'>{unreadCount}</span>}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
