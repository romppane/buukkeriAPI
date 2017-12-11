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


export default class Login extends React.Component{
  constructor(props){
    super(props);
		let status="";
    this.state = {
			id: 0,
			name:"",

	    email: "",
	    pass: "",
			phone: "",
			user:false

    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }
	componentWillUnmount() {
  localStorage.setItem('someSavedState', JSON.stringify(this.state))
	console.log(JSON.stringify(this.state))
	}
  handleEmail(value){
    this.setState({email: value})
  }
  handlePass(value){
    this.setState({pass: value})
  }
	handleLogin(){
		let promise = callBookker("SP/"+this.state.email+"&"+this.state.pass).then((data)=>{
			if(data!=""){
				data = JSON.parse(data);
				let user=data;
				status="";
				this.setState({id: user.id,
				name: user.name,

				email: user.email,
				pass: user.password,
				phone: user.phone,
				user: true
				})
				console.log(this.state.name)
				this.props.handler

			}else{

				status=strings.loginstatus;
				console.log(strings.loginstatus)
			}


		});
	}
  render(){
	  if(this.state.user){
		  return (
				<main>
				<Header user={this.state.user} />
				  <app>

			      <ul className="list-group">
			      <li className="list-group-item"><Link to="/assets/UserPage"><button className="btn btn-default btn-small">oma sivu</button></Link>  </li>
			      <li className="list-group-item"><Link to="/assets"><button className="btn btn-default btn-small">{strings.close}</button></Link>  </li>

			      </ul>



			    </app>
					<Footer />
					</main>
		  )
	  }
    return(
			<main>
			<Header user={this.state.user} />
    <app>
      <ul className="list-group">
       <Input label={strings.email} type="text" onChange={this.handleEmail} />
      <Input label={strings.password} type="password" onChange={this.handlePass} />
      <li className="list-group-item"><button className="btn btn-success" onClick={this.handleLogin}>{strings.login}</button> </li>

      <li className="list-group-item"><Link to="/assets"><button className="btn btn-default btn-small">{strings.close}</button></Link>  </li>

      </ul>



    </app>
		<Footer />
		</main>
    );
  }
}
