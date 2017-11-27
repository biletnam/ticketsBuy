import React from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default class GoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"submitted" : this.props.getSubmitted()};
    }
    _goWaiter(e){
        e.preventDefault();
        this.props.onButtonClick(()=>{
            this.setState({"submitted": !this.state.submitted});
        });
    }
    render() {
        if (this.state.submitted) {
            return <LoadingSpinner/>;
        } else {
            return (
                <input value={this.props.name} type="submit" onClick={this._goWaiter.bind(this)}/>
            );
        }
    }
}

