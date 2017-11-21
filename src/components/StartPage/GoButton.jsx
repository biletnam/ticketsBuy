import React from "react";


export default class GoButton extends React.Component {
    constructor(props) {
        super(props);
    }
    _goWaiter(event){
        this.props.history.push("searchFlights/");
    }
    render() {
        return (
            <input value={this.props.name} type="submit" onClick={this._goWaiter.bind(this)}/>
        );
    }
}
