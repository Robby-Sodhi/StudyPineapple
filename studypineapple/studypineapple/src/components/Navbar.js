import React from 'react';
import '../stylesheets/header.css';
import '../jamhacks.png';

export default class Header extends React.Component {
    render() {
        return (
            <span>
                <a href="/" className="logo">StudyPineapple</a>
                <a href="/about" className="t2">About</a>
                <a href="/rooms" className="t2">Rooms</a>
                <a href="/login" className="login">Login</a>
            </span>
        )
    }
}