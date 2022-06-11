import React from 'react'
import { useState } from 'react'

function Pagination({pageNumber, goAhead, goBefore}) {
    // let pageNumber = props.page;
    // let goAhead = props.goAhead;
    // let goBefore = props.goBefore
    return (
        <>
            <div className='w-full flex justify-center mb-8'>

                <button className='p-2 border-2 border-green-500 text-green-600 border-r-0 rounded-l-xl bg-gray-100' onClick={() => { goBefore() }}>Previous</button>
                <button className='p-2 border-2 border-green-500 text-green-600 bg-gray-100'>{pageNumber}</button>
                <button className='p-2 border-2 border-green-500 text-green-600 border-l-0 rounded-r-xl bg-gray-100' onClick={() => { goAhead() }}>Next</button>
            </div>

        </>
    )
}

export default Pagination