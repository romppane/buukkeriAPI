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
export default class Registration extends React.Component{
	  constructor(props){
	    super(props);
	    this.state = {
	     
	      fname: "",
			lname: "",
			email: "",
			phone: "",
			password: "",
			passwordconfirmation: "",
			success: ""
			
	    };



	   
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleFname = this.handleFname.bind(this);
	    this.handleLname = this.handleLname.bind(this);
	    this.handleEmail = this.handleEmail.bind(this);
	    this.handlePhone = this.handlePhone.bind(this);
	    this.handlePassword = this.handlePassword.bind(this);
	    this.handlePasswordConfirm= this.handlePasswordConfirm.bind(this);

	  }
	 
	  handleFname(e){
		  this.setState({fname: e.target.value})
	  }
	  handleLname(e){
		  this.setState({lname: e.target.value})
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
		  let user = {
				  fname : this.state.fname,
				  lname : this.state.lname,
				  email : this.state.email,
				  phone : this.state.phone,
				  password : this.state.password
			  }
		  console.log("pläää")
		  console.log(user.password)
		  console.log(JSON.stringify(user))
		  callUser("POST","users/",JSON.stringify(user)).then((response)=>{
			  if(response == "true"){
				  this.setState({success: "true"})
			  }
		  })
		  }
		  
	  }
render(){
	console.log(this.state.success);
	if(this.state.success=="true"){
		return(
		 <app>
	      <ul className="list-group">
	      <li className="list-group-item"><h1>{strings.regsuccess +""+ this.state.fname} </h1></li>
	      <li className="list-group-item"><Link to="/assets/login"><button className="btn btn-success btn-block">{strings.tologin}</button></Link>  </li>
	      </ul>
	     </app>
		)
		
	}
		return (
			 <app className="modalDialog">
		        
		        <div id="form-submit-data" className="modal-visible" >
		        <form name="form" className="form-inline" id="form-submit-data" onSubmit={this.handleSubmit}>
				          <div className="form-group">
							<input key="forname" type="text" placeholder={strings.firstname} ref="fname"  onChange={this.handleFname} value={this.state.fname}/>
						</div>,
							<div className="form-group">
							<input key="lastname" type="text" placeholder={strings.surname} ref="lname" onChange={this.handleLname}  value={this.state.lname}/>
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

		        </div>
		      </app>
	    )
	  }

}
