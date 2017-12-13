import React from 'react';
import Input from './Components/Input';
import {callBookker} from "./ajaxGet";
import {strings} from "./LocalizationStrings";
import Registration from "./Registration";
import Header from "./Header";
import Footer from "./Footer";
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
    		userObject:{}
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }
	componentWillUnmount() {
  localStorage.setItem('someSavedState', JSON.stringify(this.state.userObject))
	console.log(JSON.stringify(this.state.userObject))
	}
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
		let promise = callBookker("SP/"+email+"&"+pass).then((data)=>{
			if(data!=""){				
				data = JSON.parse(data);
				let user=data;	
				user.sp = true;
				user.user = false;				
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
	  console.log(this.state.userObject.sp);
	  if(this.state.userObject.sp){
		  return (
				<main>
				<Header sp={this.state.userObject.sp} user={this.state.userObject.user} logout={this.logout} />
				  <app>

			      <ul className="list-group">
			      <li className="list-group-item"><Link to="/UserPage"><button className="btn btn-default btn-small">oma sivu</button></Link>  </li>
			      <li className="list-group-item"><Link to="/"><button className="btn btn-default btn-small">{strings.close}</button></Link>  </li>

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
      <li className="list-group-item"><button className="btn btn-success" onClick={this.handleLogin}>{strings.login}</button> </li>

      <li className="list-group-item"><Link to="/"><button className="btn btn-default btn-small">{strings.close}</button></Link>  </li>

      </ul>



    </app>
		<Footer />
		</main>
    );
  }
}
