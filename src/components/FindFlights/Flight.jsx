import React from "react";

export default class Flight extends React.Component {
    constructor(props) {
        super(props);
        this.deltaTime = new Date(new Date(2000,1,25,this.props.timeArrival.split(":")[0],this.props.timeArrival.split(":")[1]) -
            new Date(2000,1,25,this.props.timeDeparture.split(":")[0],this.props.timeDeparture.split(":")[1]));
        this.deltaTimeStr = `${("0" + (this.deltaTime.getHours()-2)).slice(-2)}:${("0" + this.deltaTime.getMinutes()).slice(-2)}`;
    }
    render() {
        return (
            <div className="FlightComponent" onClick={this.props.onChoose}>
                <div className="flightInfo">
                    <div className="departure">
                        <img src="/images/take_off.png" alt="TakeOff picture"/>
                        <p>{this.props.cityDeparture}</p>
                        <p>{this.props.timeDeparture}</p>
                    </div>
                    <div className="middle">
                        <img src="" alt=""/>
                        <div className="timeElapsed">{this.deltaTimeStr}</div>
                        <div className="horizDelimiter">&nbsp;</div>
                        <div className="airports">
                            <div className="airportArrival">{this.props.airportArrival}</div>
                            <div className="airportDeparture">{this.props.airportDeparture}</div>
                        </div>
                    </div>
                    <div className="arrival">
                        <p>{this.props.cityArrival}</p>
                        <p>{this.props.timeArrival}</p>
                        <img src="/images/landing.png" alt="Landing"/>
                    </div>
                    <div className="ticketsAvailable">{this.props.ticketsAvailable}</div>
                </div>
                <div className="ticketsPrice">{this.props.ticketPrice}</div>
            </div>
        );
    }
};

