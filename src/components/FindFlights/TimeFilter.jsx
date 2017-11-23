import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {green100, green500, green700} from "material-ui/styles/colors";
import Slider from "material-ui/Slider";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: green500,
        primary2Color: green700,
        primary3Color: green100,
    },
}, {
    avatar: {
        borderColor: null,
    },
});

export default class TimeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.ident] : this.props.default
        };
    }
    handleTimeFilter(event,value){
        event.preventDefault();
        this.setState({
            [this.props.ident]: value
        });
        this.props.changeOuterState(value);
    }
    render() {
        return (
            <div className="timeFilterComponent">
                <h2>{this.props.caption}</h2>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Slider min={this.props.min} value={this.state[this.props.ident]} max={this.props.max} step={this.props.step} onChange={this.handleTimeFilter.bind(this)}/>
                </MuiThemeProvider>
            </div>
        );
    }
}