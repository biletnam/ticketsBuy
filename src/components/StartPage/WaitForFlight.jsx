import React from "react";


export default class GoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "pending" : ""
        };

    }
    _DotsInterval (){
        let i=0;
        setInterval(()=>{
            console.log(i);
            let dots = "";
            if (i===0) { dots = "";}
            else if (i===1) {dots = ".";}
            else if (i===2) {dots = "..";}
            else {dots = "...";}
            i++;
            i%=4;
            this.setState({
                "pending": dots
            });
        },200);

    }
    componentDidMount(){
        this._DotsInterval();
    }
    render() {
        return (
            <div>Ищем доступные варианты для Вас{this.state.pending}</div>
        );
    }
}
