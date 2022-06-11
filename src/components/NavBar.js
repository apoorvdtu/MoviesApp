import React from 'react'
import Logo from './HeaderImg.png'
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <div className=' border flex space-x-8 pl-20 py-2 items-center'>
            <img src={Logo} alt="" className='w-[120px] md:w-[190px]' />
            <Link to="/" className="text-green-600 text-xl md:text-3xl font-bold">Movies</Link>
            <Link to="/favourites" className="text-green-600 text-xl md:text-3xl font-bold">Favourites</Link>
        </div >
    )
}

export default NavBar