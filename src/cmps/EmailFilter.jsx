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
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        console.log('filterByToEdit', filterByToEdit);
    }

    return <form className="email-filter" onSubmit={onSubmitFilter} >
        <label >Type
            <input
                type="text"
                placeholder="Search by type"
                value={filterByToEdit.type}
                name="type"
                onChange={handleChange}
            />
        </label>

        <label htmlFor="status">Battery</label>
        <input
            type="number"
            id="status"
            name="minBatteryStatus"
            placeholder="Search by battery"
            value={filterByToEdit.minBatteryStatus}
            onChange={handleChange}
        />

        <button>Filter</button>
    </form>
}

EmailFilter.propTypes = {
    filterBy: PropTypes.array.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};