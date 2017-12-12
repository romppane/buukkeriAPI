const React = require ('react');
const ReactDOM = require ('react-dom');


import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import App from "./Application";
import {callBookker} from "./ajaxGet";
import Header from "./Header";
import Footer from "./Footer";
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';


export default class BookingPage extends React.Component{
	constructor(props){
		super(props)
		this.state={
				user:false
		};
		this.logout=this.logout.bind(this);
	}
	componentWillMount() {
		const state = JSON.parse(localStorage.getItem('someSavedState'))
			this.setState({
			user: state.user
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
	render(){
		return(
			<main>
			<Header user={this.state.user} logout={this.logout} />
		<app>
			<ul>
			<li>pläää</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			</ul>
		</app>
		<Footer />
		</main>
		)
	}
}
