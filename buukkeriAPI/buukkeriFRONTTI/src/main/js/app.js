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
import BookingPage from './BookingPage';
import RequireLogin from './RequireLogin';
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';





// MAIN
	class Main extends React.Component {
	  render() {


	    return (
	    		<Router>
	    		
	    	    <main>
	    	    		
						<ul>
							 <li><Link to="/assets/">Home</Link></li>
							 <li><Link to="/assets/login">Login</Link></li>
						 </ul>
						 <signin>
					        <Link to="/assets/login"><button className="btn btn-success btn-lg" > {strings.login} </button></Link>

						 </signin>
						 

	    	      <hr/>
							<Switch>
							
							<Route exact path="/assets" component={App}/>
							<Route path="/assets/Registration" component={Registration}/>
							<Route path="/assets/login" component={Login}/>
							
							
							<Route component={RequireLogin}>
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


