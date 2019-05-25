import React from 'react';
import logo from './Logo.png';
import './App.css';
const Header = () => {
    return (
        <div >
            <div className="logo-container">
                <img className="App-logo" src={logo} />
            </div>
            <header className="App-header App-title">Elamin Wisdom Kingdom</header>
        </div>
    )
};


export default Header;