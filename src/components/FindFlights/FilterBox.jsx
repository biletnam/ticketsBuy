import React from "react";
import CheckBoxer from "./CheckBoxer.jsx";
import TimeFilter from "./TimeFilter.jsx";


export default class FilterBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="FilterBoxComponent">
                <CheckBoxer caption="Аеропорт вылета"  options={this.props.departureAirportList}/>
                <hr/>
                <CheckBoxer caption="Аеропорт прилета" options={this.props.arrivalAirportList}/>
                <hr/>
                <TimeFilter caption="Время вылета после" />
                <hr/>
                <TimeFilter caption="Время прилета после" />
                <hr/>
                <TimeFilter caption="Макс.час польоту" />
            </div>
        );
    }
};

