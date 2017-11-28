import React from "react";
import CheckBoxer from "./CheckBoxer.jsx";
import TimeFilter from "./TimeFilter.jsx";
import "./FilterBox.css";

export default class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            "arr": this.props.arrivalAirportList,
            "dep": this.props.departureAirportList,
            "arrTMin" : 0,
            "depTMin": 0,
            "durT" : "24"
        };
    }
    changeStateFromInnerElems(key, value){
        this.setState({[key]: value}, ()=> {
            console.log(this.state);
            this.props.handleFilter(this.state);
        });
    }
    render() {
        return (
            <div className="FilterBoxComponent" >
                <CheckBoxer caption="Аеропорт вылета" changeOuterState={this.changeStateFromInnerElems.bind(this,"dep")} options={this.props.departureAirportList}/>
                <hr/>
                <CheckBoxer caption="Аеропорт прилета" changeOuterState={this.changeStateFromInnerElems.bind(this,"arr")} options={this.props.arrivalAirportList}/>
                <hr/>
                <TimeFilter default={0} ident={"depT"} step={1} max={24} min={0} changeOuterState={this.changeStateFromInnerElems.bind(this,"depTMin")} caption="Время вылета (после)" />
                <hr/>
                <TimeFilter default={0} ident={"arrT"} step={1} max={24} min={0} changeOuterState={this.changeStateFromInnerElems.bind(this,"arrTMin")} caption="Время прилета (после)" />
                <hr/>
                <TimeFilter default={24} ident={"maxT"} step={1} max={24} min={1} changeOuterState={this.changeStateFromInnerElems.bind(this,"durT")} caption="Макс.час польоту" />
            </div>
        );
    }
};

