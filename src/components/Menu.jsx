import React from "react";
import {Link} from "react-router-dom";


export default class Menu extends React.Component {
    render() {
        return (
            <header className="headerMenu">
                <ul className="main-nav">
                    <li><Link to="/">Билеты</Link></li>
                    <li><a href="#">Табло</a></li>
                    <li><a href="#">Гостинницы</a></li>
                    <li><Link to="/signIn">Войти</Link></li>
                </ul>
            </header>
        );
    }

}

