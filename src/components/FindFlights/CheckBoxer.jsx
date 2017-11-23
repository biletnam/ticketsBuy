import React from "react";

export default class checkBoxer extends React.Component {
    constructor(props) {
        super(props);
        console.log("checkBoxer: " + this.props.options);
    }
    render() {
        return (
            <div className="checkBoxComponent">
                <h2>{this.props.caption}</h2>
                {this.props.options.map((option) => {
                    return (
                        <label key={Math.random() * (100000- 1) + 1 }><input key={Math.random() * (100000- 1) + 1} type="checkbox" name="checkbox" value={option}/>{option}</label>
                    );
                })}
            </div>
        );
    }
}

