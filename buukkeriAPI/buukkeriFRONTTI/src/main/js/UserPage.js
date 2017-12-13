const React = require ('react');
const ReactDOM = require ('react-dom');
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
import {strings} from './LocalizationStrings';
import {callBookker} from "./ajaxGet";
import Header from "./Header";
import Footer from "./Footer";
import Input from "./Components/Input";


export default class UserPage extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {
	    		userObject:{},
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
	this.setState({userObject: user})
	console.log(user)

	
	  if(this.state.userObject.user){
		  	let userShifts = callBookker("shifts/user_id="+this.state.userObject.id).then((data)=>{
		   			 if(data!=""){
		   				 data=JSON.parse(data);
		  				 
		   			 }
		   		 });
	  }else if(this.state.userObject.sp) {
			 let spActs = callBookker("act/spid="+this.state.userObject.id).then((data)=>{
				 if(data!=""){
	   				 data=JSON.parse(data);
	   			 }
			 });
	  }
	}
		componentWillUnmount() {
	  localStorage.setItem('someSavedState', JSON.stringify(this.state.userObject))
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
		
		
		if(this.state.userObject.user){
		return(
			<main>
			<Header sp={this.state.userObject.sp} user={this.state.userObject.user} logout={this.logout} />
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.userObject.fname}</li>
			<li className="list-group-item">{this.state.userObject.lname}</li>
			<li className="list-group-item">{this.state.userObject.email}</li>
			<li className="list-group-item">{this.state.userObject.phone}</li>
			<li className="list-group-item">{}</li>
			</ul>


			</app>
			</main>
		)
		}else if(this.state.userObject.sp){
			return(
			<main>
			<Header sp={this.state.userObject.sp} user={this.state.userObject.user} logout={this.logout} />
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.userObject.name}</li>
			<li className="list-group-item"></li>
			<li className="list-group-item">{this.state.userObject.email}</li>
			<li className="list-group-item">{this.state.userObject.phone}</li>
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
