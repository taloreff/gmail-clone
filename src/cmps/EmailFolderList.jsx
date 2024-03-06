import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

import path from "../services/image-path";

export function EmailFolderList({ onSetFilter }) {
    const navigationLinks = [
        { to: '/inbox', name: 'Inbox', icon: path.inbox },
        { to: '/sent', name: 'Sent', icon: path.sent },
        { to: '/starred', name: 'Starred', icon: path.starred },
        { to: '/drafts', name: 'Drafts', icon: path.drafts },
        { to: '/trash', name: 'Trash', icon: path.trash },
    ]
    return (
        <div className='email-folder-list'>
            <button className="compose-btn" onClick={() => onSetFilter({ mail: 'compose' })}>
                <img height={20} width={20} src={path.edit} />
            </button>
            <nav>
                {navigationLinks.map((status, index) => {
                    return <NavLink key={index}
                        to={status.to}
                    >
                        <img height={20} width={20} src={status.icon} alt={status.name} />
                        {/* <span>{status.name}</span> */}
                    </NavLink>
                })}
            </nav>
        </div>
    )
}

EmailFolderList.propTypes = {
    onSetFilter: PropTypes.func.isRequired
};