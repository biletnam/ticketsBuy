import React from "react";
import axios from "axios";
import LoadingSpinner from "../StartPage/LoadingSpinner.jsx";


export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "agreement": false,
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
        });
    }
    _checkBoxChange(){
        this.setState({
            "agreement": !this.state.agree
        });
    }
    _checkAllFiedls() {
        let AllFieldsInputted = true;
        for(let i=0; i< this.state.passengers ; i++){
            let cur = this.state.passengers[i];
            if (!cur.fName || !cur.sName || !cur.birthday || !cur.passportId || !cur.email || !cur.tel){
                AllFieldsInputted = false;
                break;
            }
        }
        return AllFieldsInputted;
    }
    _nextButtonClicked() {
        let self = this;
        if (this._checkAllFiedls && this.state.agreement) {
            this.setState({
                "submitted":true
            });
            let sendObj = {
                "passengers" : this.state.passengers,
                "flight": this.props.location.state
            };
            console.log(sendObj);
            axios.post("/sendPassengerData", sendObj)
                .then(response => {
                    if (response.data.bookedSuccessfully){
                        self.props.history.push("/success" , response.data);
                    } else {
                        self.props.history.push("/failed");
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
                            <label>Email</label>
                            <input type="email" name="email" key={i + "email"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].email}/>
                        </div>
                        <div className="block">
                            <label>Контактный телефон</label>
                            <input type="tel" name="tel" key={i + "tel"} onChange={this.onChangeInput.bind(this, i)} value={this.state.passengers[i].tel}/>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.submitted) {
            return( <div className="additionalInfoComponent">
                <div className="passengersList">
                    {passengersInput}
                </div>
                <label><input type="checkbox" checked={this.state.agreement} onChange={this._checkBoxChange.bind(this)} />Я согласен с условиями перельота и студента, сделавшего этот сайт</label>
                <input type="button" value="Дальше" onClick={this._nextButtonClicked.bind(this)}/>
                <LoadingSpinner/>
            </div> );
        } else {
            return (
                <div className="additionalInfoComponent">
                    <div className="passengersList">
                        {passengersInput}
                    </div>
                    <label><input type="checkbox" checked={this.state.agreement} onChange={this._checkBoxChange.bind(this)} />Я согласен с условиями перельота и студента, сделавшего этот сайт</label>
                    <input type="button" value="Дальше" onClick={this._nextButtonClicked.bind(this)}/>
                </div>
            );
        }
    }
}

