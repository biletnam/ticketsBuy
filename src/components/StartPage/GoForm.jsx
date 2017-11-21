import React from "react";
import GoButton from "./GoButton.jsx";


export default class GoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "inputFrom": "",
            "inputWhere": "",
            "dateFrom": `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()+1}`,
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
                    <input name="inputFrom" type="text" value={this.state.inputFrom} onChange={this._inputChange.bind(this)} placeholder="Откуда" className="inputFrom" />
                    <input name="inputWhere" type="text" value={this.state.inputWhere} onChange={this._inputChange.bind(this)} placeholder="Куда" className="inputWhere" />
                    <input name="dateFrom" type="date" value={this.state.dateFrom} onChange={this._inputChange.bind(this)}  className="dateFrom" />
                    <input name="dateBack" type="date" value={this.state.dateBack} onChange={this._inputChange.bind(this)} className="dateBack"/>
                    <input name="personAmount" type="number" value={this.state.personAmount} onChange={this._inputChange.bind(this)} className="personAmount" />
                    <GoButton name="Подобрать" {...this.props} />
                </form>
            </div>
        );
    }
}
