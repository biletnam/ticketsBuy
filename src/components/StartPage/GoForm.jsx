import React from "react";
import GoButton from "./GoButton.jsx";

import axios from "axios";


export default class GoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "inputFrom": "",
            "inputWhere": "",
            "dateFrom": `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
            "dateBack": "",
            "personAmount": "",
            "submitted": false
        };
    }

    _inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    checkFormInputed() {
        return (this.state.inputFrom && this.state.inputWhere && this.state.dateFrom && this.state.dateBack && this.state.personAmount);
    }

    componentDidMount() {
        let FlightData = JSON.parse(localStorage.getItem("flightWish"));
        if (FlightData) {
            this.setState({
                "inputFrom": FlightData.inputFrom,
                "inputWhere": FlightData.inputWhere,
                "dateFrom": FlightData.dateFrom,
                "dateBack": FlightData.dateBack,
                "personAmount": FlightData.personAmount
            });
        }
    }
    componentDidUpdate() {
        this._updateLocalStorage();
    }
    _updateLocalStorage(){
        let obj = {
            "inputFrom": this.state.inputFrom,
            "inputWhere": this.state.inputWhere,
            "dateFrom": this.state.dateFrom,
            "dateBack": this.state.dateBack,
            "personAmount": this.state.personAmount
        };
        var JsonFlight = JSON.stringify(obj);
        localStorage.setItem("flightWish", JsonFlight);
    }
    handleSubmitButton(callback) {
        let self = this;
        if (this.checkFormInputed()) {
            callback();
            axios.post("/findAvailableFlights", self.state)
                .then(response => {
                    response.data.personAmount = self.state.personAmount;
                    this.props.history.push("/findFlights", response.data);
                })
                .catch(error => {
                    throw new Error("GoForm:handleSubmitButton: " + error.message);
                });
        } else {
            alert("Некоторые поля не были заполнены :(");
        }
    }

    getSubmitted() {
        return this.state.submitted;
    }

    render() {
        return (
            <div className="GoForm">
                <form>
                    <input name="inputFrom" type="text" value={this.state.inputFrom} onChange={this._inputChange.bind(this)} placeholder="Откуда" className="inputFrom"/>
                    <input name="inputWhere" type="text" value={this.state.inputWhere} onChange={this._inputChange.bind(this)} placeholder="Куда" className="inputWhere"/>
                    <input name="dateFrom" type="date" value={this.state.dateFrom} onChange={this._inputChange.bind(this)} className="dateFrom"/>
                    <input name="dateBack" type="date" value={this.state.dateBack} onChange={this._inputChange.bind(this)} className="dateBack"/>
                    <input name="personAmount" type="number" value={this.state.personAmount} onChange={this._inputChange.bind(this)} className="personAmount"/>
                    <GoButton name="Подобрать" getSubmitted={this.getSubmitted.bind(this)} onButtonClick={this.handleSubmitButton.bind(this)} {...this.props} />
                </form>
            </div>
        );
    }
}
