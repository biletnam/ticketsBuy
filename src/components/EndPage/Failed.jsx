import React from "react";


export default class Failed extends React.Component {
    constructor(props) {
        super(props);
    }
    _nextButtonClicked() {
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="failedPageComponent">
                <img src="/images/failed.png" alt="FailedPng"/>
                <h1>Что-то пошло не так</h1>
                <input type="button" value="Вернуться назад" onClick={this._nextButtonClicked.bind(this)}/>
            </div>
        );
    }
}

