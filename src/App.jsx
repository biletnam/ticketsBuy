import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Menu from "./components/Menu.jsx";
import StartPage from "./components/StartPage/StartPage.jsx";
import FindFlights from "./components/FindFlights/FindFlights.jsx"
import Tickets from "./components/Tickets/Tickets.jsx"
import AdditionalInfo from "./components/AdditionalInfo/AdditionalInfo.jsx"
import Success from "./components/EndPage/Success.jsx"
import Failed from "./components/EndPage/Failed.jsx"
import NotFound from "./components/NotFound.jsx"



export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Menu/>
                    <div className="appBodyDiv">
                        <Switch>
                            <Route exact path="/" component={StartPage}/>
                            {/*<Route path="/findFlights" component={FindFlights}/>*/}
                            {/*<Route path="/tickets" component={Tickets}/>*/}
                            {/*<Route path="/info" component={AdditionalInfo}/>*/}
                            {/*<Route path="/success" component={Success}/>*/}
                            {/*<Route path="/failed" component={Failed}/>*/}
                            {/*<Route component={NotFound}/>*/}
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
