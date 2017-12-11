
//import logo from 'src/main/img/vapaatvuorot.png';

const React = require ('react');
import {strings} from "./LocalizationStrings";
import { Link } from 'react-router-dom';

	
	
export default class Header extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={
			
			user:false
		}
	}
	componenWillMount(){
		console.log(JSON.parse(localStorage.getItem('someSavedState')));
		
		
	}
	
	  render() {
	    return (
	    		<header>

				<Link to="/assets/">
					<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
				</Link>
				<Link className="btn btn-warning btn-lg" to="/assets/login">{strings.login}</Link>
				<Link className="btn btn-success btn-lg" to="/assets/piilo">{strings.telnum}</Link>
				
				
				</header>
	    );
	  }
	}

