const React = require ('react');
const ReactDOM = require ('react-dom');

import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import Header from "./Header";
import LogReg from "./Signin";
import App from "./Application";
import Footer from "./Footer";
import Login from './LoginSivu';
import NoMatch from './NoMatch';
import Registration from './Registration';
import BookingPage from './BookingPage';

import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch,
		Redirect
	} from 'react-router-dom';



export default class RequireLogin extends React.Component{
	constructor(props)
	{
		super(props);
	}
	componentDidMount(){
		
		console.log(JSON.parse(localStorage.getItem('someSavedState')).user);
		
	if(!JSON.parse(localStorage.getItem('someSavedState')).user){
		console.log(this.props)
		this.props.history.push("/login")
		
	}else {
		
		console.log(this.props)
		
	}
	}
	render(){
		if(JSON.parse(localStorage.getItem('someSavedState')).user){
	return <Redirect to={this.props.location.pathname}/>
	}else{
	return	null
	}
	}
}





/*const requireLoggin = (nextState, replace)=>{
	if (!user.isLogged()){
		replace({path:'/login'})
	}
	
}




const LoginRoutes = () => {
	return (
	<Route path="/bookingpage" component={Logged} onEnter={requireLoggin}/>		
	)
}

*/




































