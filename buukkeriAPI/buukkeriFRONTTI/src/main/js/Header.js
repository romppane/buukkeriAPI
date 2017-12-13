const React = require ('react');
import {strings} from "./LocalizationStrings";
import { Link } from 'react-router-dom';



export default class Header extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={
			id: 0,
			fname:"",
			lname:"",
	    email: "",
	    pass: "",
			phone: "",
			user:false,
			sp: false,
		}
		this.logout = this.logout.bind(this);
	}
componentWillReceiveProps(nextProps){
	this.setState({user:nextProps.user});
}
logout(){
	this.props.logout(false);
	this.setState({id: 0,
	fname:"",
	lname:"",
	email: "",
	pass: "",
	phone: "",
	sp:false,
	user:false});
	localStorage.setItem('someSavedState', JSON.stringify(this.state))
}
	  render() {

			if (this.state.user || this.state.sp){
			return(
			<header>
				<Link to="/" className="logoarea">
					<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
				</Link>
				<div className="loginarea">
					<Link className="btn btn-lg btn-logout" to="/" onClick={this.logout} >{strings.logout}</Link>
					<Link className="btn btn-lg btn-user" to="/UserPage">{strings.profile}</Link>
				</div>
			</header>
			)	;
			}else{
	    return (
	    	<header>
					<Link to="/" className="logoarea">
						<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
					</Link>
					<div className="loginarea">
						<Link className="btn btn-lg" to="/login">{strings.login}</Link>
						<Link className="btn btn-rg" to="/Registration">{strings.register}</Link>
					</div>
				</header>
	    );
		}
	  }
	}
