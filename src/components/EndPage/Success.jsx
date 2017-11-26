import React from "react";


export default class Success extends React.Component {
    constructor(props) {
        super(props);
        this.successData = this.props.location.state;
        console.log(this.successData);
    }
    _nextButtonClicked() {
        this.props.history.push("/");
    }
    render() {
        let pdfPath = `/pdf/${this.successData.bookingId}.pdf#zoom=85&scrollbar=0&toolbar=0&navpanes=0`;
        return (
            <div className="SuccessPageComponent">
                <img src="/images/success.png" alt="SuccessPng"/>
                <h2>Ваши билеты готовы</h2>
                <object width="100%" height="500" type="application/pdf" data={pdfPath} id="pdf_content">
                    <p>PDF cannot be displayed.</p>
                </object>
                <input type="button" value="Вернуться на главную" onClick={this._nextButtonClicked.bind(this)}/>
            </div>
        );
    }
}

