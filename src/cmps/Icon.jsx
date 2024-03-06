
import PropTypes from 'prop-types';

export function Icon({ iconData }) {
    return (
        <div className='icon'>
            <img className={`menu-icon icon-hover ${iconData.style}`}
                src={iconData.src}
                alt={iconData.alt}
            />
        </div>
    )
}

Icon.propTypes = {
    iconData: PropTypes.object.isRequired
};