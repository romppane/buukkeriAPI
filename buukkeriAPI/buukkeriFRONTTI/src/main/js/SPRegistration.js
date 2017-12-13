const React = require ('react');
const ReactDOM = require ('react-dom');
import {callUser} from "./ajaxPutPostDelete";
import { strings } from "./LocalizationStrings";
import Input from './Components/Input';
import Header from "./Header";

import Footer from "./Footer";
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
	let passStatus=strings.passwordlenght;
	let passconfStatus="";
	let emailStatus="";
	let telStatus="";
	let pass="";
	let passconf="";
export default class Registration extends React.Component{
	  constructor(props){
	    super(props);
	    this.state = {

	      name: "",
			
			email: "",
			phone: "",
			password: "",
			passwordconfirmation: "",
			success: ""

	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handlename = this.handlename.bind(this);
	    
	    this.handleEmail = this.handleEmail.bind(this);
	    this.handlePhone = this.handlePhone.bind(this);
	    this.handlePassword = this.handlePassword.bind(this);
	    this.handlePasswordConfirm= this.handlePasswordConfirm.bind(this);

	  }

	  handlename(value){
		  this.setState({name: value})
	  }
	 
	  handleEmail(value){
		  this.setState({email: value})
			if( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ==false) {
			  emailStatus=strings.errdialcheckemail;
		  }else{
			  emailStatus="";
		  }

	  }
	  handlePhone(value){
		  this.setState({phone: value})
			if(/^\d{10}$/.test(value)==false){
			  telStatus=strings.errdialcheckphone;
			}else{
				telStatus="";
			}
	  }
	  handlePassword(value){
		  this.setState({password: value},)
			if(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)==false){
				passStatus=strings.tooshort;
		  }else{
			  passStatus="";
		  }
	  }
	  handlePasswordConfirm(value){
		  this.setState({passwordconfirmation: value})
			if(this.state.password != value){
			  passconfStatus=strings.errdialpasswdmatch;

		  }else{
			  passconfStatus="";
		  }
	  }


	  handleSubmit(){
		  if(this.state.name == ""
				  || this.state.email == ""
					  || this.state.phone == ""
						  || this.state.password == ""
							 || this.state.passworconfirmation =="" ){
			  alert(strings.errdialfillall);
		  }else if( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email) ==false) {
				console.log(1)
			}else if(/^\d{10}$/.test(this.state.phone)==false){
				console.log(2)
			}else if(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(this.state.password)==false){
				console.log(3)
			}else if(this.state.password !== this.state.passwordconfirmation){
				console.log(4)
			}else{
				  let user = {
						  name : this.state.name,
						  email : this.state.email,
						  phone : this.state.phone,
						  password : this.state.password
				  }
				  console.log("pläää")
				  console.log(user.password)
				  console.log(JSON.stringify(user))
				  callUser("POST","SP/",JSON.stringify(user)).then((response)=>{
					  console.log(response)
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
			<main>
			<Header user={this.state.user} />
		 	<app>
	      <ul className="list-group">
	      <li className="list-group-item"><h1>{strings.regsuccess +""+ this.state.name} </h1></li>
	      <li className="list-group-item"><Link to="/login"><button className="btn btn-success btn-block">{strings.tologin}</button></Link>  </li>
	      </ul>
	     </app>
			 <Footer />
			 </main>
		)

	}
		return (
			<main>
			<Header user={this.state.user} />
			<app className="modalDialog">
			 		<ul className="list-group">
						<Input label={strings.spname} type="text" onChange={this.handlename} />
					
						<Input label={strings.email} type="text" onChange={this.handleEmail} status={emailStatus}/>
						<Input label={strings.telnum} type="text" onChange={this.handlePhone} status={telStatus}/>
						<Input label={strings.password} type="password" onChange={this.handlePassword} status={passStatus} />
						<Input label={strings.confirm} type="password" onChange={this.handlePasswordConfirm} status={passconfStatus} />
						<li className="list-group-item"><button className="btn btn-success btn-block" onClick={this.handleSubmit} >{strings.submit}</button></li>
					</ul>
		   </app>
			 <Footer />
			 </main>
	    )
	  }

}
