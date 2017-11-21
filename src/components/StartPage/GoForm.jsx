import React from "react";
import GoButton from "./GoButton.jsx";


export default class GoForm extends React.Component {
    render() {
        return (
            <div className="GoForm">
                <form action="/checkForm">
                    <input name="inputFrom" type="text" placeholder="Откуда" className="From" required/>
                    <input name="inputWhere" type="text" placeholder="Куда" className="To" required/>
                    <input name="dateFrom" type="date" value="" className="DateFrom" required/>
                    <input name="dateBack" type="date" value="" className="DateTo"/>
                    <input name="personAmount" type="number" value="" className="Persons" required/>
                    <GoButton name="Подобрать"/>
                </form>
            </div>
        );
    }
}
