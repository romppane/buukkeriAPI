/**
 * @author Tommi Rokolampi
 */

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
import Language from './Language';
import Piilo from './Piilo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookingPage from './BookingPage';
import RequireLogin from './RequireLogin';
import UserPage from './UserPage';
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch,
		Redirect
	} from 'react-router-dom';
import SPRegistration from "./SPRegistration";
import SPLogin from "./SPLogin";



class AuthRoute extends React.Component {
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
}
  componentWillMount() {
  const user = localStorage.getItem('someSavedState')
  this.setState({id: user.id,
  fname: user.fname,
  lname: user.lname,
  email: user.email,
  pass: user.password,
  phone: user.phone,
  user: true
  })
	console.log(user)
}
  render() {
    if (!this.state.user) {

      return <Redirect to={this.props.redirectToLogin} />
    }
    return <Route path={this.props.path} component={this.props.component}/>
  }
}



// MAIN
	class Main extends React.Component {
		constructor(props)
		{
			super(props)
			this.state={
				loggedin:false,
				loginbtntext: strings.login,
				loginbtncolor: "btn-success",
				user: ""
					
			}
			this.handler = this.handler.bind(this)
			
		}
		componentDidMount(){
			this.state.user = JSON.parse(localStorage.getItem('someSavedState'));
			console.log(this.state.user.user)
			if(this.state.user.user==true){
				this.setState({loginbtntext: strings.logout, loginbtncolor: "btn-warning"});
			}else{
				this.setState({loginbtntext: strings.login, loginbtncolor: "btn-success"});
			}

		}
			
			
		handler() {
			
		    this.setState({
		      loggedin: true

		    })
		    console.log(this.state.loggedin)
		    console.log("täällä")
		  }
		 
		
	  render() {
		
		  
	    return (
	    		<Router>

	    	    <main>
	    	    	<header>

						<Link to="/assets/">
							<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
						</Link>
						<Link className={"btn btn-success btn-lg"} to="/assets/login">{this.state.loginbtntext}</Link>
						<Link className="btn btn-success btn-lg" to="/assets/piilo">piilo</Link>

						<Language />
						</header>
							<Switch>

							<Route exact path="/assets" component={App}/>

							<Route path="/assets/Registration" component={Registration}/>
							<Route path="/assets/SPRegistration" component={SPRegistration}/>
							<Route path="/assets/login" component={Login} handler={this.handler} />
							<Route path="/assets/SPlogin" component={SPLogin} handler={this.handler}/>
							<AuthRoute redirectToLogin="/assets/login" path="/assets/piilo" auth={true} component={Piilo} />
							<Route path="/assets/UserPage" component={UserPage}/>
							<Route path="/assets/BookingPage" component={BookingPage}/>
							
							<Route component={NoMatch}/>
							</Switch>
	    	    <Footer />
	    		 </main>

	    	  </Router>

	    );
	  }
	}
	
ReactDOM.render(<Main />, document.getElementById("react"));
