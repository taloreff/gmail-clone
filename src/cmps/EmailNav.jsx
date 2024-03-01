import navLogo from '../assets/imgs/Gmail-Emblem.png'
import { EmailFilter } from './EmailFilter'
import PropTypes from 'prop-types';


export function EmailNav({ filterBy, onSetFilter }) {
    return <nav className="email-nav">
        <img className='logo-img' src={navLogo} alt="gmail logo" />
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
    </nav>
}

EmailNav.propTypes = {
    filterBy: PropTypes.object.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};