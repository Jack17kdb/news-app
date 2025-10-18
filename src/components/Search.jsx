import React, { useState } from 'react'

const Search = ({ category, setCategory, handleCategoryChange }) => {
    const [inputValue, setInputValue] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategory(inputValue);
        handleCategoryChange();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="input w-80">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search"
                    placeholder="Search..."
                    className='grow'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </label>
        </form>
    )
}

export default Search