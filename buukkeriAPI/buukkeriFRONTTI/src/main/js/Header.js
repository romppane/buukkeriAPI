
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

			user:false
		}
	}
componentWillReceiveProps(nextProps){
	this.setState({user:nextProps.user});
}
	  render() {

			if (this.state.user){
			return(
				<header>

			<Link to="/">
				<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
			</Link>
			<button className="btn btn-danger btn-lg">{strings.logout}</button>
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
				<Link className="btn btn-success btn-lg" to="/UserPage">{strings.profile}</Link>
				<Language />

				</header>
	    );
		}
	  }
	}
