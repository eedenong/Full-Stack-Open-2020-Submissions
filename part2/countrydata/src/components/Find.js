import React from 'react'

const Find = ({ newSearch, handleSearchChange }) => {

    return (
        <div>
            <form onSubmit={() => console.log('searching for country')}>
                <div>
                    find countries <input value={newSearch} onChange={handleSearchChange} />
                </div>
            </form>
        </div>
    )
}

export default Find