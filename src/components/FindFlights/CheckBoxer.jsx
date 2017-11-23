import React from "react";

export default class checkBoxer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "checkBoxes":this.props.options.slice()
        };
    }
    handleCheckBoxerFilter(option){
        let copyState = this.state.checkBoxes.slice();
        if(copyState.indexOf(option) ===-1){
            copyState.push(option);
        } else {
            copyState.splice(copyState.indexOf(option),1);
        }
        this.setState({
            "checkBoxes": copyState
        });
        this.props.changeOuterState(copyState);

    }
    render() {
        return (
            <div className="checkBoxComponent">
                <h2>{this.props.caption}</h2>
                {this.props.options.map((option) => {
                    return (
                        <label key={Math.random() * (100000- 1) + 1 }><input checked={this.state.checkBoxes.indexOf(option)!==-1} onChange={()=>{ this.handleCheckBoxerFilter(option);}} key={Math.random() * (100000- 1) + 1} type="checkbox" name="checkbox" value={option}/>{option}</label>
                    );
                })}
            </div>
        );
    }
}

