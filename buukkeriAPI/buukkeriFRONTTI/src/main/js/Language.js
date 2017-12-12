import React from 'react';
import {strings} from "./LocalizationStrings";



export default class Language extends React.Component {
  constructor(props) {
    super(props);
    var lan = ""
    if(strings.getInterfaceLanguage() == "fi-FI" || strings.getInterfaceLanguage() == "fi") {
      lan = "fin";
    }
    else {
      lan = "en";
    }
    this.state = {
      language: lan
    };
    this.handleFIN = this.handleFIN.bind(this);
    this.handleEN = this.handleEN.bind(this);
  }

  handleFIN() {
    this.setState({language: "fin"});
    strings.setLanguage("fin");
  }
  handleEN() {
    this.setState({language: "en"});
    strings.setLanguage("en");
  }
  render() {
    return(
      <div className="btn-group">
        <button type="button" className="btn btn-default" onClick={this.handleFIN}>FIN</button>
        <button type="button" className="btn btn-default" onClick={this.handleEN}>ENG</button>
      </div>
    );
  }
}
