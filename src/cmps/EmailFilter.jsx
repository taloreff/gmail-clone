import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);

    function onSubmitFilter(ev) {
        ev.preventDefault();
        onSetFilter(filterByToEdit);
    }

    function handleChange(ev) {
        let { value } = ev.target;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, subject: value, body: value, from: value, to: value }));
    }

    return (
        <form className="email-filter" onSubmit={onSubmitFilter}>
            <div className="email-filter-input">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="email-filter-icon" />
                <input
                    type="text"
                    value={filterByToEdit.type}
                    name="mail"
                    onChange={handleChange}
                    placeholder="Search mail"
                />
            </div>
        </form>
    );
}

EmailFilter.propTypes = {
    filterBy: PropTypes.object.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};
