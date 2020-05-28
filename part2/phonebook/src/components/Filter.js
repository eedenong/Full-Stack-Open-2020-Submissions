import React from 'react'

const Filter = ({newFilter, setFilterValue, showAll, setShowAll}) => {
    
    // event handler for filter input
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }

    // event handler for filter field
    const showFiltered = (event) => {
        event.preventDefault()
        setShowAll(!showAll)
    }

    return (
        <div>
            <form onSubmit={showFiltered} >
                <div>
                    filter shown with: <input value={newFilter} onChange={handleFilterChange} />
                </div>
            </form>
        </div>
    )
}

export default Filter