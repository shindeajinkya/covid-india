import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

function Nav() {
    return (
        <nav className="row space-between">
            <ul className="row nav">
                <li>
                    <NavLink
                        to='/'
                        exact
                        activeStyle={activeStyle}
                        className='nav-link'
                    >
                    Cases
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/helpline'
                        activeStyle={activeStyle}
                        className='nav-link'
                    >
                    Helplines
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/headlines'
                        activeStyle={activeStyle}
                        className='nav-link'
                    >
                    News
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav