import React from "react";
import axios from "axios";
import LoadingSpinner from "../StartPage/LoadingSpinner.jsx";
import Flight from "../FindFlights/Flight.jsx";
import "./AdditionalInfo.css";
export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "agreement": false,
            "submitted": false,
            "passengers":[]
        };
        for (let i = 0; i < this.props.location.state.personAmount;i++) {
            this.state.passengers[i] = {
                "fName": "",
                "sName": "",
                "birthday": "",
                "passportId": "",
                "tel":"",
                "email": ""
            };
        }
        this.ticketsToBook = this.props.location.state.ticketsAvailable - this.props.location.state.personAmount < 0 ? this.props.location.state.ticketsAvailable : this.props.location.state.personAmount;
        this.ticketsLeft = this.props.location.state.ticketsAvailable - this.props.location.state.personAmount < 0 ? 0 : this.props.location.state.ticketsAvailable - this.props.location.state.personAmount;
    }
    componentDidMount() {
        let Passengers = JSON.parse(localStorage.getItem("passengers"));
        if (Passengers){
            let copyState = this.state.passengers;
            if (Passengers.length > this.props.location.state.personAmount) {
                Passengers = Passengers.slice(0, this.props.location.state.personAmount);
            } else if (Passengers.length < this.props.location.state.personAmount){
                let args = [0, Passengers.length].concat(Passengers);
                Array.prototype.splice.apply(copyState, args);
                Passengers = copyState;
            }
            this.setState({"passengers" : Passengers});
        }
    }
    componentDidUpdate() {
        this._updateLocalStorage();
    }
    _updateLocalStorage(){
        let passengers = JSON.stringify(this.state.passengers);
        localStorage.setItem("passengers", passengers);
    }
    onChangeInput(Id, event) {
        let curPasState = this.state.passengers;
        curPasState[Id][event.target.name] = event.target.value;
        this.setState({
            "passengers": curPasState
        });
    }
    _checkBoxChange(){
        this.setState({
            "agreement": !this.state.agreement
        });
    }
    _checkAllFiedls() {
        let AllFieldsInputted = true;
        for(let i=0; i< this.state.passengers ; i++){
            let cur = this.state.passengers[i];
            if (!cur.fName || !cur.sName || !cur.birthday || !cur.passportId || !cur.email || !cur.tel){
                AllFieldsInputted = false;
                break;
            }
        }
        return AllFieldsInputted;
    }
    _nextButtonClicked() {
        let self = this;
        if (this._checkAllFiedls && this.state.agreement) {
            this.setState({
                "submitted":true
            });
            let sendObj = {
                "passengers" : this.state.passengers,
                "flight": this.props.location.state
            };
            axios.post("/sendPassengerData", sendObj)
                .then(response => {
                    if (response.data.bookedSuccessfully){
                        self.props.history.push("/success" , response.data);
                    } else {
                        self.props.history.push("/failed");
                    }
                })
                .catch(error => {
                    throw new Error("AdditionalInfo:nextButtonClicked: " + error.message);
                });
        } else {
            alert("Некоторые поля не были были заполнены или отмечены:(");
        }
    }
    render() {
        let passengersInput = [];
        for (let i = 0; i < this.ticketsToBook; i++){
            passengersInput.push(
                <div className="uniquePassenger" key={i}>
                    <div className="headerPassenger">Пасажир {i+1}</div>
                    <div className="line-separator-bold-additional">&nbsp;</div>
                    <div className="info">
                        <div className="firstColumn">
                            <div className="block">
                                <label>Имя</label>
                                <input name="fName" key={i + "fName"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].fName}/>
                            </div>
                            <div className="block">
                                <label>Дата рождения</label>
                                <input type="date" name="birthday" key={i + "birthday"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].birthday}/>
                            </div>
                            <div className="block">
                                <label>Email</label>
                                <input type="email" name="email" key={i + "email"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].email}/>
                            </div>
                        </div>
                        <div className="secondColumn">
                            <div className="block">
                                <label>Фамилия</label>
                                <input type="text" name="sName" key={i + "sName"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].sName}/>
                            </div>
                            <div className="block">
                                <label>Паспорт</label>
                                <input type="text" name="passportId" key={i + "passportId"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].passportId}/>
                            </div>
                            <div className="block">
                                <label>Контактный телефон</label>
                                <input type="tel" name="tel" key={i + "tel"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].tel}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.submitted) {
            return( <div className="additionalInfoComponent">
                <Flight
                    key={this.props.location.state.key}
                    airportArrival={this.props.location.state.airportArrival}
                    airportDeparture={this.props.location.state.airportDeparture}
                    timeDeparture={this.props.location.state.timeDeparture}
                    timeArrival={this.props.location.state.timeArrival}
                    cityDeparture={this.props.location.state.cityDeparture}
                    cityArrival={this.props.location.state.cityArrival}
                    ticketsAvailable={this.props.location.state.ticketsAvailable - this.props.location.state.personAmount}
                    airlinesLogo = {this.props.location.state.airlinesLogoLink}
                    ticketPrice={this.props.location.state.ticketPrice} {...self.props} />
                <div className="passengersList">
                    {passengersInput}
                </div>
                <label><input type="checkbox" checked={this.state.agreement} onChange={this._checkBoxChange.bind(this)} />Я согласен с условиями перельота и студента, сделавшего этот сайт</label>
                <input type="button" value="Дальше" onClick={this._nextButtonClicked.bind(this)}/>
                <LoadingSpinner/>
            </div> );
        } else {
            return (
                <div className="additionalInfoComponent">
                    <Flight
                        additionalPage="true"
                        key={this.props.location.state.key}
                        airportArrival={this.props.location.state.airportArrival}
                        airportDeparture={this.props.location.state.airportDeparture}
                        timeDeparture={this.props.location.state.timeDeparture}
                        timeArrival={this.props.location.state.timeArrival}
                        cityDeparture={this.props.location.state.cityDeparture}
                        cityArrival={this.props.location.state.cityArrival}
                        ticketsAvailable={this.ticketsLeft}
                        airlinesLogo = {this.props.location.state.airlinesLogoLink}
                        ticketPrice={this.ticketsToBook * this.props.location.state.ticketPrice} {...self.props} />
                    <div className="passengersList">
                        {passengersInput}
                    </div>
                    <label><input type="checkbox" checked={this.state.agreement} onChange={this._checkBoxChange.bind(this)} />Я согласен с условиями перельота и студента, сделавшего этот сайт</label>
                    <input type="button" value="Дальше" onClick={this._nextButtonClicked.bind(this)}/>
                </div>
            );
        }
    }
}

