const React = require ('react');
const ReactDOM = require ('react-dom');
import {callUser} from "./ajaxPutPostDelete";
import { strings } from "./LocalizationStrings";
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
export default class SPRegistration extends React.Component{
	  constructor(props){
	    super(props);
	    this.state = {
	     
	    	name:"",
			email: "",
			phone: "",
			password: "",
			passwordconfirmation: "",
			emailIsValid: false,
			PohneIsValid: false,
			PasswordIsValid: false
				
	    };



	   
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleName = this.handleName.bind(this);
	    this.handleEmail = this.handleEmail.bind(this);
	    this.handlePhone = this.handlePhone.bind(this);
	    this.handlePassword = this.handlePassword.bind(this);
	    this.handlePasswordConfirm= this.handlePasswordConfirm.bind(this);

	  }
	 
	 handleName(e){
		 this.setState({name: e.target.value})
	 }
	  handleEmail(e){
		  this.setState({email: e.target.value})
		  
	  }
	  handlePhone(e){
		  this.setState({phone: e.target.value})
	  }
	  handlePassword(e){
		  this.setState({password: e.target.value})
	  }
	  handlePasswordConfirm(e){
		  this.setState({passwordconfirmation: e.target.value})
	  }
	  

	  handleSubmit(){
		  if(this.state.fname == ""
			  || this.state.lname == "" 
				  || this.state.email == "" 
					  || this.state.phone == "" 
						  || this.state.password == "" 
							 || this.state.passworconfirmation =="" ){
			  alert(strings.errdialfillall);
		  }
		  
		  
		  else if( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email) ==false) {
			  alert(strings.errdialcheckemail)
		  }
			  
		  else if(/^\d{10}$/.test(this.state.phone)==false){
			  alert(strings.errdialcheckphone)
		  }
		  else if(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(this.state.password)==false){
			  
		  }
		  else if(this.state.password != this.state.passwordconfirmation){
			  alert(strings.errdialpasswdmatch)
		  }
		  
		  
		  else{
		  let sp = {
				  name : this.state.name,
				  email : this.state.email,
				  phone : this.state.phone,
				  password : this.state.password
			  }
		  console.log("pläää")
		  console.log(sp.password)
		  console.log(JSON.stringify(sp))
		  callUser("POST","SP/",JSON.stringify(sp)).then((response)=>{
			  console.log(response.response);
		  })
		  
		  }
		  
	  }
render(){
		return (
			 <app className="modalDialog">
		        
		        <div id="form-submit-data" className="modal-visible" >
		        <form name="form" className="form-inline" id="form-submit-data" onSubmit={this.handleSubmit}>
				          <div className="form-group">
							<input key="spname" type="text" placeholder={strings.spname} ref="name"  onChange={this.handleName} value={this.state.name}/>
						</div>,
							<div className="form-group">
							<input key="email" type="text" placeholder={strings.email} ref="email" onChange={this.handleEmail}  value={this.state.email}/>
						</div>,
							<div className="form-group">
							<input key="phone" type="text" placeholder={strings.telnum} ref="phone" onChange={this.handlePhone}  value={this.state.phone}/>
						</div>,
							<div className="form-group">
							<input key="password" type="password" placeholder={strings.password} ref="password" onChange={this.handlePassword}  value={this.state.pass}/>
						</div>
							<div className="form-group">
							<input key="password" type="password" placeholder={strings.confirm} ref="passwordconfirm" onChange={this.handlePasswordConfirm}  value={this.state.passwordconfirmation}/>
						</div>
				          	<button type="button" className="btn btn-success" value="Submit"  onClick={this.handleSubmit}>{strings.submit}</button>
				          	
		          </form>
		          <li className="list-group-item"><Link to="/assets"><button className="btn btn-default btn-small">{strings.close}</button></Link>  </li>
		        </div>
		      </app>
	    )
	  }

}
