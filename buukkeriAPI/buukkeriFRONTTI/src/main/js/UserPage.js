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

let sports;
const LOCALHOST = 'http://localhost:8090/';

export function callUser(method,url,data){
	return new Promise((resolve, reject)=>{
		const call = new XMLHttpRequest();
		call.open(method,LOCALHOST+url);
		call.onload = ()=> resolve(call.responseText);
		call.onerror = ()=> reject(call.statusText);
		call.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		call.send(data);
		
	});
}
export default class UserPage extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {
	    		userObject:{},
	    		sports:[],
	    		
				actid: "",
				actname: "",
				actspid: "",
				actlocation: "",
				actdescription: "",
				actsportid: "",
				selected: "",
				success: ""
	    };
	    this.getData=this.getData.bind(this);
		this.logout=this.logout.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleLocation=this.handleLocation.bind(this);
		this.handleName=this.handleName.bind(this);
		this.handleDescription=this.handleDescription.bind(this);
		this.handleRadios=this.handleRadios.bind(this);
	

	}
	  componentWillMount() {
	const user = JSON.parse(localStorage.getItem('someSavedState'))
	this.setState({userObject: user})

	console.log(JSON.parse(localStorage.getItem('sports')))
			  sports = JSON.parse(localStorage.getItem('sports'))
			  this.setState({sports : sports})
			  	console.log(JSON.parse(localStorage.getItem('sports')))
	
	}
	  
	  	componentDidMount(){
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
			if(!this.state.userObject.user&&!this.state.userObject.sp){
				localStorage.setItem('someSavedState', JSON.stringify(this.state))
			}else{
				let logout=[];
				logout.sp = false;
				logout.user = false;
				this.setState({
					userObject:logout
				})
			}
		}
		handleName(value){
			this.setState({actname: value})
		}
		

		handleLocation(e){
			this.setState({actlocation: e})
		}
		handleDescription(e){
			this.setState({actdescription: e.target.value})
		}
		
		handleRadios(e){
			
			this.setState({selected: e})
		}

	  getData(id){

	  }
	  
	  
	  
	  handleSubmit(){
		  let act = {
				  name : this.state.actname,
				  spid: this.state.userObject.id,
				  location : this.state.actlocation,
				  description : this.state.actdescription,
				 
				  sportid : this.state.selected
		  }
		  console.log(JSON.stringify(act))
		  
		 console.log(act)
		 	  callUser("POST","act/",JSON.stringify(act)).then((response)=>{
					  console.log(response)
					  if(response == "true"){
						  	this.setState({success: "true"})
						  	alert("Your activity has been added");
					  }
		  })
		 
		  
		  
		  
		}
	render(){
		
		console.log(this.state.selected)
		const radios = sports.map((sport)=>
		<Input name="radsport" key={sport.id} value={sport.id} label={sport.name} type="radio" onChange={this.handleRadios}  />
		);

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
			console.log(this.state.actdescription)
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
			<li className="list-group-item"><label>{strings.addactivity}</label></li>
		 	{radios}
			<li className="list-group-item"><label>{strings.description}</label></li>			 	
			<li className="list-group-item"><textarea value={this.state.actdescription} onInput={this.handleDescription}></textarea></li>
			<li className="list-group-item"><button className="btn btn-success btn-block"  onClick={this.handleSubmit}>{strings.submit}</button></li>

			  			</ul>


			</app>
			<Footer />
			</main>
		)}
		}
	}
