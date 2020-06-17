import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

function Nav() {
    return (
        <ThemeConsumer>
            {
                ({theme, toggleTheme }) => (
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
                        <button
                                style={{fontSize: 30}}
                                className='btn-clear'
                                onClick={toggleTheme}
                            >
                            {theme === 'light' ? '🔦' : '💡'}
                        </button>
                    </nav>
                )
            }
        </ThemeConsumer>
    )
}

export default Nav