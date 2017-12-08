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
class AuthRoute extends React.Component {
  render() {
    if (!true) {

      return <Redirect to={this.props.redirectToLogin} />
    }
    return <Route path="/assets/piilo" component={this.props.component}/>
  }
}



// MAIN
	class Main extends React.Component {
		constructor(props)
		{
			super(props)
			this.state={loggedin:false}
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

	    	    <main>
	    	    	<header>

						<Link to="/assets/">
							<img src="/src/main/img/vapaatvuorot.png" alt="Vapaatvuorot.fi" className="logo"></img>
						</Link>
						<Link className="btn btn-success btn-lg" to="/assets/login">{strings.login}</Link>
						<Link className="btn btn-success btn-lg" to="/assets/piilo">piilo</Link>

						<Language />
						</header>
							<Switch>

							<Route exact path="/assets" component={App}/>

							<Route path="/assets/Registration" component={Registration}/>
							<Route path="/assets/SPRegistration" component={SPRegistration}/>
							<Route path="/assets/login" component={Login} handler={this.handler}/>
							<AuthRoute redirectToLogin="/assets/login" component={Piilo} />
							<Route component={RequireLogin}>
							<Route path="assets/UserPage" component={UserPage}/>
						    <Route path="assets/BookingPage" component={BookingPage}/>
							</Route>
							<Route component={NoMatch}/>
							</Switch>
	    	    <Footer />
	    		 </main>

	    	  </Router>

	    );
	  }
	}
ReactDOM.render(<Main />, document.getElementById("react"));
