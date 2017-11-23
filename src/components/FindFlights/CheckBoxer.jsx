import React from "react";

export default class checkBoxer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="checkBoxComponent">
                <h2>{this.props.caption}</h2>
                {this.props.options.map((option) => {
                    return (
                        <label><input type="checkbox" name="checkbox" value={option}>{option}</input></label>
                    );
                })}
            </div>
        );
    }
}

