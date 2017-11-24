import React from "react";
import Flight from "../FindFlights/Flight";


export default class FindFlights extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            "submitted": false
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="additionalInfoComponent">
                <Flight/>
                <div className="inputAdditional">
                    <form>
                        // TODO rewrire array
                        for (let i=0; i< this.state.ticketsAmount; i++){
                            <input placeholder="Имя" name="fName" value={this.state.fName}/>
                            <input type="text" placeholder="Фамилия" name="sName" value={this.state.sName}/>
                            <input type="text" placeholer="Паспорт" name="passportId" value={this.state.passportID}/>
                            <input type="text" placeholer="Паспорт" name="passportId" value={this.state.passportID}/>
                        }
                    </form>
                </div>
            </div>
        );
    }
}

