const React = require ('react');
const ReactDOM = require ('react-dom');


import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import App from "./Application";
import {callBookker} from "./ajaxGet";
import Header from "./Header";
import Footer from "./Footer";
import {Redirect} from 'react-router-dom';
import Button from './Components/Button';
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
			userObject:{},
				shifts: [],
				act:[],
				shiftid:0
		};
		this.logout=this.logout.bind(this);
		this.checkshift=this.checkshift.bind(this);
	}
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('someSavedState'))
		 this.setState({userObject: user})
			let data=[];
			callBookker("/shifts/actid="+parseInt(this.props.match.params.id)).then((data)=>{
				data = JSON.parse(data);
				this.setState({shifts: data});
	})
			callBookker("/act/"+parseInt(this.props.match.params.id)).then((data)=>{
				data = JSON.parse(data);
				this.setState({act: data});
		})
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
	checkshift(userid){
		if(userid==0){
			return strings.book;
		}else{
			return"Vuoro varattu";
		}
	}
	bookshift(shiet){
		console.log(shiet)
	}
	render(){
		const availableshifts = this.state.shifts.map((item)=>
		 <li key={item.id} value={item.id} id="lists"  className="list-group-item">
		{strings.shifttime}:{item.shift_time} {strings.shiftdate}:{item.shift_date} {strings.price}:{item.price}€
		<Button className="btn btn-primary btn pull-right btn-sm" userid={this.state.userObject.id} shift={item} onClick={this.bookshift} name={this.checkshift(item.userId)} /> </li>)


		if(this.state.userObject.user){
			return(
				<main>
				<Header sp={this.state.userObject.sp} user={this.state.userObject.user} logout={this.logout} />
			<app>
			<h3>{this.state.act.name}</h3>
			<p>{this.state.act.location}</p>
			<p>{this.state.act.description}</p>
				<ul className="list-group">
				{availableshifts}
				</ul>
			</app>
			<Footer />
			</main>
			)
		}else{
			return(
				<Redirect to="/login" />
			)
		}

	}
}
