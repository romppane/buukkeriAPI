
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
    //this.refreshPage = this.refreshPage.bind(this);
  }
  handleFIN() {
    this.setState({language: "fin"});
    strings.setLanguage("fin");
    //this.refreshPage();
  }
  handleEN() {
    this.setState({language: "en"});
    strings.setLanguage("en");
    //this.refreshPage();
  }
  //refreshPage(){
    //window.location.reload();
  //}
  render() {
    return(
      <language>
        <img src="/src/main/img/FIN.png" alt="FIN" className="flag" onClick={this.handleFIN}></img>
        <img src="/src/main/img/EN.png" alt="EN" className="flag" onClick={this.handleEN}></img>
      </language>
    );
  }
}
