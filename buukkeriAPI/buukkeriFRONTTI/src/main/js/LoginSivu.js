import React from 'react';
import Input from './Components/Input';
import {callBookker} from "./ajaxGet";
import {strings} from "./LocalizationStrings";
import Registration from "./Registration";
import Header from "./Header";
import Footer from "./Footer";
import Language from './Language';
//import RequireLogin from "./RequireLogin";

import UserPage from './UserPage';
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';

	 let email="";
	 let pass="";
export default class Login extends React.Component{
  constructor(props){
    super(props);
		let status="";
    this.state = {
    		userObject:{},
			id: 0,
			fname:"",
			lname:"",
	    email: "",
	    pass: "",
			phone: "",
			user:false,
			sp:false,

    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
		this.logout = this.logout.bind(this);
  }
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('someSavedState'))

		 this.setState({userObject: user})
		 console.log(user)

}
	logout(value){
			this.setState({id: 0,
			fname:"",
			lname:"",
	    email: "",
	    pass: "",
			phone: "",
		  user: value
		  })
		}


	componentWillUnmount() {
		localStorage.setItem('someSavedState', JSON.stringify(this.state.userObject))
		console.log(JSON.stringify(this.state.userObject))	}


	handleEmail(value){
	    email =	value;

	  }
	  handlePass(value){
	    pass = value;

	  }
	handleLogin(){
		let sp;
		let user;
		console.log(email+pass)
		let promise = callBookker("users/"+email+"&"+pass).then((data)=>{
			if(data!=""){

				data = JSON.parse(data);
				let user=data;
				user.sp = false;
				user.user = true;
				status="";
				this.setState({userObject: user,
				})
				console.log(this.state.userObject);
			}else{
				status=strings.loginstatus;
				console.log(strings.loginstatus)

			}
		});
	}
  render(){
	  if(this.state.userObject.user){
		  return (
				<main>
				<Header user={this.state.userObject.user} logout={this.logout} />
				
				  <app>
			      <ul className="list-group">
			      	<li className="list-group-item"><Link className="btn btn-default btn-small" to="/UserPage">oma sivu</Link>  </li>
			      	<li className="list-group-item"><Link className="btn btn-default btn-small" to="/">{strings.close}</Link>  </li>
			      </ul>
			    </app>
					<Footer />
				</main>
		  )
	  }
    return(
			<main>
			<Header sp={this.state.userObject.sp} user={this.state.userObject.user} logout={this.logout} />

    	<app>
      <ul className="list-group">
       <Input label={strings.email} type="text" onChange={this.handleEmail} />
      <Input label={strings.password} type="password" onChange={this.handlePass} />
      <li className="list-group-item"><button className="btn btn-success" onClick={this.handleLogin}>{strings.login}</button> <Link to="/SPlogin"><button className="btn btn-success btn pull-right btn-sm">{strings.serveiceproviders}</button></Link> </li>
      <li className="list-group-item"><Link to="/Registration" className="btn btn-primary">{strings.register}</Link> <Link to="/SPRegistration" className="btn btn-primary btn pull-right btn-sm">{strings.serveiceproviders}</Link> </li>
      <li className="list-group-item"><Link to="/" className="btn btn-default btn-small">{strings.close}</Link>  </li>
      </ul>
    </app>
		<Footer />
		</main>
    );
  }
}
