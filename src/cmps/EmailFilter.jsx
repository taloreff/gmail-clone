import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange(ev) {
        let { value } = ev.target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, subject: value, body: value, from: value, to: value }))
    }

    return <form className="email-filter" onSubmit={onSubmitFilter} >
        <input
            type="text"
            placeholder="Search mail"
            value={filterByToEdit.type}
            name="mail"
            onChange={handleChange}
        />
    </form>
}

EmailFilter.propTypes = {
    filterBy: PropTypes.array.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};