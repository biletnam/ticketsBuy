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
                <h2>Что-то пошло не так</h2>
                <div className="returnButtonDiv">
                    <input className="returnButton" type="button" value="Вернуться назад" onClick={this._nextButtonClicked.bind(this)}/>
                </div>
            </div>
        );
    }
}

