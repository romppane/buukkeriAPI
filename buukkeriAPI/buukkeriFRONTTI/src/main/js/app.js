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
		componentDidMount(){
			this.state.user = JSON.parse(localStorage.getItem('someSavedState'));
			
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
	    	   
	    	    	
						 <Language />
							<Switch>
							
							<Route exact path="/assets" component={App}/>
	
							<Route path="/assets/Registration" component={Registration}/>
							<Route path="/assets/SPRegistration" component={SPRegistration}/>
							<Route path="/assets/login" component={Login} handler={this.handler} pena={this.state.pena} />
							<Route path="/assets/SPlogin" component={SPLogin} handler={this.handler}/>
							
							<AuthRoute redirectToLogin="/assets/login" path="/assets/piilo" component={Piilo} />
							<AuthRoute redirectToLogin="/assets/login" path="/assets/UserPage" component={UserPage}/>
							<AuthRoute redirectToLogin="/assets/login" path="/assets/BookingPage" component={BookingPage}/>
							<AuthRoute redirectToSPLogin="/assets/SPlogin" path="/assets/SPpage" component={UserPage}/>
							//Auth Route
							/*<Route component={RequireLogin} >
								
							
								<Route path="/assets/UserPage" component={UserPage}/>
								<Route path="/assets/BookingPage" component={BookingPage}/>
							</Route>*/
							<Route component={NoMatch}/>
						
							
							</Switch>
							
	    	   
	    		 </main>

	    	  </Router>
	    	  
	    );
	  }
	}
	
ReactDOM.render(<Main />, document.getElementById("react"));
