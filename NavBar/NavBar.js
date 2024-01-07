import React from 'react';
import './NavBar.css'

function NavBar({start, end}) {
    return (
        <div className='navbar'>
            <div className='col-6'>{start}</div>
            <div className='col-6 flex justify-end'>{end}</div>
        </div>
    );
}

export default NavBar;