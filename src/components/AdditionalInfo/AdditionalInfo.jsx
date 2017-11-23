import React from "react";


export default class FindFlights extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            "flights": this.props.location.state,
            "displayedFlights": this.props.location.state,
            "submitted": false
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>AdditionalInfoCOmponent</div>
        );
    }
}

