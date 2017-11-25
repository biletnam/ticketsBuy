import React from "react";
import axios from "axios";


export default class FindFlights extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            "submitted": false,
            "passengers":[]
        };
        for (let i = 0; i < this.props.location.state.personAmount;i++) {
            this.state.passengers[i] = {
                "fName": "",
                "sName": "",
                "birthday": "",
                "passportId": "",
                "tel":"",
                "email": ""
            };
        }
    }

    onChangeInput(Id, event) {
        let curPasState = this.state.passengers;
        curPasState[Id][event.target.name] = event.target.value;
        this.setState({
            "passengers": curPasState
        },()=> console.log(this.state));
    }

    _checkAllFiedls() {
        let AllFieldsInputted = true;
        for(let i=0; i< this.state.passengers ; i++){
            let cur = this.state.passengers[i];
            if (!cur.fName || !cur.sName || !cur.birthday || !cur.passportID || cur.email || cur.tel){
                AllFieldsInputted = false;
                break;
            }
        }
        return AllFieldsInputted;
    }
    _nextButtonClicked() {
        if (this._checkAllFiedls && this.state.agreement) {
            this.setState({
                "submitted":true
            });
            axios.post("/sendPassengerData", this.state.passengers)
                .then(response => {
                    if (response.data.bookedSuccessful){
                        self.props.history.push("/success" , response.data);
                    } else {
                        self.props.history.push("/failed" , response.data);
                    }
                })
                .catch(error => {
                    throw new Error("AdditionalInfo:nextButtonClicked: " + error.message);
                });
        } else {
            alert("Некоторые поля не были были заполнены или отмечены:(");
        }
    }
    render() {
        let passengersInput = [];
        for (let i = 0; i < +this.props.location.state.personAmount; i++){
            passengersInput.push(
                <div className="uniquePassenger" key={i}>
                    <div>Пасажир {i+1}</div>
                    <div className="line-separator">&nbsp;</div>
                    <div className="info">
                        <div className="block">
                            <label>Имя</label>
                            <input name="fName" key={i + "fName"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].fName}/>
                        </div>
                        <div className="block">
                            <label>Фамилия</label>
                            <input type="text" name="sName" key={i + "sName"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].sName}/>
                        </div>
                        <div className="block">
                            <label>Дата рождения</label>
                            <input type="date" name="birthday" key={i + "birthday"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].birthday}/>
                        </div>
                        <div className="block">
                            <label>Паспорт</label>
                            <input type="text" name="passportId" key={i + "passportId"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].passportID}/>
                        </div>
                        <div className="block">
                            <input type="email" name="email" key={i + "email"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].email}/>
                        </div>
                        <div className="block">
                            <input type="tel" name="tel" key={i + "tel"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].tel}/>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.submitted) {
            return <LoadingSpinner/>;
        } else {
            return (
                <div className="additionalInfoComponent">
                    <div className="passengersList">
                        {passengersInput}
                    </div>
                    <label><input type="checkbox" checked={this.state.agreement} />Я согласен с условиями перельота и студента, сделавшего этот сайт</label>
                    <input type="button" name="Дальше" onClick={this._nextButtonClicked}/>
                </div>
            );
        }
    }
}

