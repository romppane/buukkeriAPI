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
				
	    };
	    this.getData=this.getData.bind(this);
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
	  user: true
	  })
		console.log(user.user)
	  }else if (user.sp){
		  this.setState({id: user.id,
			  name: user.name,
			  email: user.email,
			  pass: user.password,
			  phone: user.phone,
			  sp: true
			  
			  })
			  console.log(user.sp)
	  }
	  
		//With this we get the shifts that user has
		let promise = callBookker("shifts/user_id="+this.state.id).then((data)=>{
			 if(data!=""){
				 data=JSON.parse(data);
				 console.log(data)
			 }
		 })
		
	}
	  getData(id){
		 
	  }
	render(){
		if(this.state.user){
			
		
		return(
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.fname}</li>
			<li className="list-group-item">{this.state.lname}</li>
			<li className="list-group-item">{this.state.email}</li>
			<li className="list-group-item">{this.state.phone}</li>
			<li className="list-group-item">{}</li>
			</ul>
			
			
			</app>
		
		)}else if(this.state.sp){
			return(
			<app>
		      <ul className="list-group">
			<li className="list-group-item">{this.state.name}</li>
			<li className="list-group-item"></li>
			<li className="list-group-item">{this.state.email}</li>
			<li className="list-group-item">{this.state.phone}</li>
			<li className="list-group-item"></li>
			</ul>
			
			
			</app>
		)}
	}
}