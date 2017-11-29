import React from "react";
import "./Flight.css";
export default class Flight extends React.Component {
    constructor(props) {
        super(props);
        this.deltaTime = new Date(new Date(2000,1,25,this.props.timeArrival.split(":")[0],this.props.timeArrival.split(":")[1]) -
            new Date(2000,1,25,this.props.timeDeparture.split(":")[0],this.props.timeDeparture.split(":")[1]));
        this.deltaTimeStr = `${("0" + (this.deltaTime.getHours()-2)).slice(-2)}:${("0" + this.deltaTime.getMinutes()).slice(-2)}`;
        console.log(this.props);
    }
    render() {
        let ticketsAvailText = null;
        if (this.props.ticketsAvailable<10) {
            ticketsAvailText =  <p className="hot">{this.props.ticketsAvailable}</p>;
        } else {
            ticketsAvailText =  <p>{this.props.ticketsAvailable}</p>;
        }
        return (
            <div className="FlightComponent" onClick={this.props.onChoose}>
                <div className="flightInfo">
                    <div className="departure block">
                        <img src="/images/take_off.png" alt="TakeOff picture"/>
                        <div className="departureData">
                            <p>{this.props.cityDeparture}</p>
                            <p>{this.props.timeDeparture}</p>
                        </div>
                    </div>
                    <div className="line-separator">&nbsp;</div>
                    <div className="middle block">
                        <img src={this.props.airlinesLogo} alt="AirlineLogo"/>
                        <div className="timeElapsed">{this.deltaTimeStr}</div>
                        <div className="line-separator-bold">&nbsp;</div>
                        <div className="airports">
                            <p className="airportArrival">{this.props.airportDeparture}</p>
                            <p className="airportDeparture">{this.props.airportArrival}</p>
                        </div>
                    </div>
                    <div className="line-separator">&nbsp;</div>
                    <div className="arrival block">
                        <div className="arrivalData">
                            <p>{this.props.cityArrival}</p>
                            <p>{this.props.timeArrival}</p>
                        </div>
                        <img src="/images/landing.png" alt="Landing"/>
                    </div>
                    <div className="ticketsAvailable block">
                        <p>Билетов<br/> осталось</p>{}
                        {ticketsAvailText}
                    </div>
                    <div className="ticketsPrice">
                        <p>Цена билета</p>
                        <p>{this.props.ticketPrice}</p></div>
                </div>
            </div>
        );
    }
}

