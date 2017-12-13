const React = require ('react');
const ReactDOM = require ('react-dom');
import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import Header from "./Header";
import App from "./Application";
import Footer from "./Footer";
import Login from './LoginSivu';
import NoMatch from './NoMatch';
import Registration from './Registration';
import Language from './Language';
import BookingPage from './BookingPage';
import UserPage from './UserPage';
import {
	  HashRouter as Router,
	  Route,
	  Link,
		Switch,
		Redirect
	} from 'react-router-dom';
import SPRegistration from "./SPRegistration";
import SPLogin from "./SPLogin";
import AuthRoute from "./Components/AuthRoute";





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
							<Switch>
								<Route exact path="/" component={App}/>
								<Route path="/Registration" component={Registration}/>
								<Route path="/SPRegistration" component={SPRegistration}/>
								<Route path="/login" component={Login} handler={this.handler} pena={this.state.pena} />
								<Route path="/SPlogin" component={SPLogin} handler={this.handler}/>
	
							
								<AuthRoute redirectToLogin="/login" path="/UserPage" component={UserPage}/>
								<AuthRoute redirectToLogin="/login" path="/Booking:id" component={BookingPage}/>
								<AuthRoute redirectToSPLogin="/SPlogin" path="/SPpage" component={UserPage}/>
								<Route component={NoMatch}/>
							</Switch>
	    	  </Router>
	    );
	  }
	}

ReactDOM.render(<Main />, document.getElementById("react"));
