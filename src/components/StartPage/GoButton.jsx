import React from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default class GoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"submitted": false};
    }
    _goWaiter(e){
        e.preventDefault();
        this.setState({"submitted": true});
        this.props.onButtonClick((res)=>{
            this.props.history.push(this.props.link, res);
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

