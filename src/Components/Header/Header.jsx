import React from 'react';
import { NavLink, } from "react-router-dom";
import './Header.css'

const Header = () => {
    return (
        <nav className='text-center'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/registerRBS'>RegisterRBS</NavLink>
        </nav>
    );
};

export default Header;