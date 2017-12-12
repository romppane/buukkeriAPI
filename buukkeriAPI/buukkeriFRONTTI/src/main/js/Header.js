
//import logo from 'src/main/img/vapaatvuorot.png';

const React = require ('react');
import {strings} from "./LocalizationStrings";
import { Link } from 'react-router-dom';
import Language from './Language';



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
	l
	localStorage.setItem('someSavedState', JSON.stringify(this.state))
}
	  render() {

			if (this.state.user || this.state.sp){
			return(
				<header>

			<Link to="/">
				<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
			</Link>
			<button className="btn btn-danger btn-lg" onClick={this.logout} >{strings.logout}</button>
			<Link className="btn btn-success btn-lg" to="/UserPage">{strings.profile}</Link>
			<Language />

			</header>
			)	;
			}else{
	    return (
	    		<header>

				<Link to="/">
					<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
				</Link>
				<Link className="btn btn-success btn-lg" to="/login">{strings.login}</Link>
				<Link className="btn btn-success btn-lg" to="/Registration">{strings.register}</Link>
				<Language />

				</header>
	    );
		}
	  }
	}
