import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className='flex justify-center w-full mb-8 w-90'>
            <div className="join grid grid-cols-3 items-center mx-auto text-white">
                <button className="join-item btn btn-outline" onClick={() => onPageChange(currentPage - 1)} disabled>Prev</button>
                <button className="join-item btn btn-outline" disabled>{currentPage} of {totalPages}</button>
                <button className="join-item btn btn-outline" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}

export default Pagination