import React from "react";


export default class GoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input value={this.props.name} type="submit" />
        );
    }
}
