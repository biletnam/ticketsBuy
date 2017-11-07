import React from "react";
import GoForm from "./GoForm.jsx";
import GoButton from "./GoButton.jsx";

export default class StartPage extends React.Component {
    render() {
        return (
            <div className="startPageWrapper">
                <h1 className="MainHeader"> Хочешь быстро оказаться в любой точке мира?</h1>
                <h2 className="SubHeader">Начни свое путешествие с нами...</h2>
                {/*<GoForm />*/}
                {/*<GoButton />*/}
            </div>
        );
    }
}
