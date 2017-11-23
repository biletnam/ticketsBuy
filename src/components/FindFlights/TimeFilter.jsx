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
    }

    render() {
        return (
            <div className="timeFilterComponent">
                <h2>{this.props.caption}</h2>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Slider defaultValue={1} />
                </MuiThemeProvider>
            </div>
        );
    }
}