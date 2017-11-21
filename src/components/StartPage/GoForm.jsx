import React from "react";
import GoButton from "./GoButton.jsx";


export default class GoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "inputFrom": "",
            "inputWhere": "",
            "dateFrom": "01-01-1970",
            "dateBack": "",
            "personAmount": ""
        };
    }
    _inputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div className="GoForm">
                <form action="/checkForm">
                    <input name="inputFrom" type="text" value={this.state.inputFrom} onChange={this._inputChange.bind(this)} placeholder="Откуда" className="inputFrom" required/>
                    <input name="inputWhere" type="text" value={this.state.inputWhere} onChange={this._inputChange.bind(this)} placeholder="Куда" className="inputWhere" required/>
                    <input name="dateFrom" type="date" value={this.state.dateFrom} onChange={this._inputChange.bind(this)}  className="dateFrom" required/>
                    <input name="dateBack" type="date" value={this.state.dateBack} onChange={this._inputChange.bind(this)} className="dateBack"/>
                    <input name="personAmount" type="number" value={this.state.personAmount} onChange={this._inputChange.bind(this)} className="personAmount" required/>
                    <GoButton name="Подобрать"/>
                </form>
            </div>
        );
    }
}
