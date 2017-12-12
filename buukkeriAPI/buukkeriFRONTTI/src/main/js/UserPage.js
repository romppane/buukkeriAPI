const React = require ('react');
const ReactDOM = require ('react-dom');
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import {callBookker} from "./ajaxGet";
import Header from "./Header";
import Footer from "./Footer";
import Input from "./Components/Input";
export default class UserPage extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {
				id: 0,
				name: "",
				fname:"",
				lname:"",
		    email: "",
		    pass: "",
				phone: "",
				user:false,
				sp: false,
				actid: "",
				actname:"",
				actspid:"",
				actlocation: "",
				actDescription: "",
				actsportid: "",
	    };
	    this.getData=this.getData.bind(this);
		this.logout=this.logout.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleLocation=this.handleLocation.bind(this);
		this.handleDescription=this.handleDescription.bind(this);
		this.handleDescription=this.handleDescription.bind(this);
	}
	  componentWillMount() {

	  const user = JSON.parse(localStorage.getItem('someSavedState'))
	  if(user.user){
	  this.setState({id: user.id,
	  fname: user.fname,
	  lname: user.lname,
	  email: user.email,
	  pass: user.password,
	  phone: user.phone,
	  user: user.user
	  })
		console.log(user.user)
	  }else if (user.sp){
		  this.setState({id: user.id,
			  name: user.name,
			  email: user.email,
			  pass: user.password,
			  phone: user.phone,
			  sp: user.sp

			  })
			  console.log(user.sp)
	  }

	  if(this.state.user){
		  	let userShifts = callBookker("shifts/user_id="+this.state.id).then((data)=>{
		   			 if(data!=""){
		   				 data=JSON.parse(data);
		  				 
		   			 }
		   		 });
	  }else if(this.state.sp) {
			 let spActs = callBookker("act/spid="+this.state.id).then((data)=>{
				 if(data!=""){
	   				 data=JSON.parse(data);
	   			 }
			 });
	  }
	}
		componentWillUnmount() {
	  localStorage.setItem('someSavedState', JSON.stringify(this.state))
		}

		logout(value){
				this.setState({
			  user: value
			  })
		}
		handleName(){
			 			
		}
		handleSubmit(){
			 			
		}
			 		
		handleLocation(){
			 			
		}
		handleDescription(){
				
		}


	  getData(id){

	  }
	render(){
		console.log(this.state.fname)
		
		if(this.state.user){
		return(
			<main>
			<Header user={this.state.user} logout={this.logout} />
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.fname}</li>
			<li className="list-group-item">{this.state.lname}</li>
			<li className="list-group-item">{this.state.email}</li>
			<li className="list-group-item">{this.state.phone}</li>
			<li className="list-group-item">{}</li>
			</ul>


			</app>
			</main>
		)
		}else if(this.state.sp){
			return(
			<main>
			<Header user={this.state.user} logout={this.logout} />
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.name}</li>
			<li className="list-group-item"></li>
			<li className="list-group-item">{this.state.email}</li>
			<li className="list-group-item">{this.state.phone}</li>
			<li className="list-group-item"><label>{strings.addactivity}</label></li>
			 		
			<Input label={strings.activityname} type="text" onChange={this.handleName} />
		 	<Input label={strings.location} type="text" onChange={this.handleLocation}  />
		 	<Input label={strings.location} type="radio" onChange={this.handleLocation} value="1" />
		 	<li className="list-group-item"><label>{strings.description}</label></li>			 	<li className="list-group-item"><textarea onChange={this.handleDescription}></textarea></li>
			<li className="list-group-item"><button className="btn btn-success btn-block"  onClick={this.handleSubmit}>{strings.submit}</button></li>
			 		
			  			</ul>
			

			</app>
			<Footer />
			</main>
		)}
		}
	}
