import navLogo from '../assets/imgs/Gmail-Emblem.png'
import questionUrl from "../assets/imgs/question_mark.svg";
import settings from "../assets/imgs/settings.svg";
import apps from "../assets/imgs/apps.svg";
import user from "../assets/imgs/user_img.png";

import { EmailFilter } from './EmailFilter'
import { Icon } from './Icon';


export function EmailNav({ filterBy, onSetFilter }) {

    const icons = [
        { src: questionUrl, alt: 'help' },
        { src: settings, alt: 'settings' },
        { src: apps, alt: 'apps' },
        { src: user, alt: 'user', style: 'user-image' }
    ]

    return <nav className="email-nav">
        <img className='logo-img' src={navLogo} alt="gmail logo" />
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <div className="email-header-buttons">
            {icons.map((icon, index) => {
                return <Icon iconData={icon} key={index} />
            })}
        </div>
    </nav>
}

