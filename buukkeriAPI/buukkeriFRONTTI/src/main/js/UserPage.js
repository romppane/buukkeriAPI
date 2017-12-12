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

export default class UserPage extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {
				id: 0,
				fname:"",
				lname:"",
		    email: "",
		    pass: "",
				phone: "",
				user:false,

	    };
	    this.getData=this.getData.bind(this);
			this.logout=this.logout.bind(this);
	}
	  componentWillMount() {
	  const state = JSON.parse(localStorage.getItem('someSavedState'))
	  this.setState({id: state.id,
	  fname: state.fname,
	  lname: state.lname,
	  email: state.email,
	  pass: state.password,
	  phone: state.phone,
	  user: state.user
	  })
		//With this we get the shifts that user has
		let promise = callBookker("shifts/user_id="+this.state.id).then((data)=>{
			 if(data!=""){
				 data=JSON.parse(data);
			 }
		 })
	}
		componentWillUnmount() {
	  localStorage.setItem('someSavedState', JSON.stringify(this.state))
		}

		logout(value){
				this.setState({
			  user: value
			  })
		}



	  getData(id){

	  }
	render(){
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
			<Footer />
			</main>

		)
	}
}
