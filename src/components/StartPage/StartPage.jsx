import React from "react";
import GoForm from "./GoForm.jsx";
import "./StartPage.css";
export default class StartPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="startPageWrapper col-100">
                <h1 className="MainHeader col-100"> Хочешь быстро оказаться в любой точке мира?</h1>
                <h2 className="SubHeader col-100">Начни свое путешествие с нами...</h2>
                <GoForm {...this.props}/>
            </div>
        );
    }
}
