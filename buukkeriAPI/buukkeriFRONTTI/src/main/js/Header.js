const React = require ('react');
import {strings} from "./LocalizationStrings";
import { Link } from 'react-router-dom';



export default class Header extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={
				user:false,
				sp:false
			}

		this.logout = this.logout.bind(this);
	}
	componentWillMount() {
const user = JSON.parse(localStorage.getItem('someSavedState'))
this.setState({user: user.user,
sp:user.sp})
}

componentWillReceiveProps(nextProps){
	if(nextProps.user||nextProps.sp){
		this.setState({user:nextProps.user,
		sp:nextProps.sp})
	}else{
		this.setState({user:nextProps.user,
		sp:nextProps.sp})
		this.props.logout(false);
	}

	}
logout(){
	this.props.logout(false);
}
	  render() {

			if (this.state.user || this.state.sp){
			return(
			<header>
				<Link to="/" className="logoarea">
					<img src="/src/main/img/vvlogo.png" alt="Vapaatvuorot.fi" className="logo"></img>
				</Link>
				<div className="loginarea">
					<button className="btn btn-lg btn-logout" onClick={this.logout} >{strings.logout}</button>
					<Link className="btn btn-lg btn-user" to="/UserPage">{strings.profile}</Link>
				</div>
			</header>
			)	;
			}else{
	    return (
	    	<header>
					<Link to="/" className="logoarea">
						<img src="/src/main/img/vvlogo.png" alt="Vapaatvuorot.fi" className="logo"></img>
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
