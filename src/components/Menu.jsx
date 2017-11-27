import React from "react";
import {Link} from "react-router-dom";


export default class Menu extends React.Component {
    render() {
        return (
            <header className="headerMenu">
                <ul className="main-nav">
                    <li><Link to="/">БИЛЕТЫ</Link></li>
                    <li><a href="#">ТАБЛО</a></li>
                    <li><a href="#">ГОСТИННИЦЫ</a></li>
                    <li className="rightEnter"><Link to="/signIn">ВОЙТИ</Link></li>
                </ul>
            </header>
        );
    }

}

