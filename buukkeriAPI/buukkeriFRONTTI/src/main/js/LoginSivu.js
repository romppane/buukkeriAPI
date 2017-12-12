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
		  const state = JSON.parse(localStorage.getItem('someSavedState'))
		  if(state.user){
		  this.setState({id: state.id,
		  fname: state.fname,
		  lname: state.lname,
		  email: state.email,
		  pass: state.password,
		  phone: state.phone,
		  user: state.user
		  })
			console.log(state.user)
		  }else if (state.sp){
			  this.setState({id: state.id,
				  name: state.name,
				  email: state.email,
				  pass: state.password,
				  phone: state.phone,
				  sp: state.sp

				  })
				  console.log(user.sp)
		  }
		 
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
  localStorage.setItem('someSavedState', JSON.stringify(this.state))
	}
  handleEmail(value){
    this.setState({email: value})
  }
  handlePass(value){
    this.setState({pass: value})
  }
	handleLogin(){
		let promise = callBookker("users/"+this.state.email+"&"+this.state.pass).then((data)=>{
			if(data!=""){
				data = JSON.parse(data);
				let state=data;
				status="";
				this.setState({id: state.id,
				fname: state.fname,
				lname: state.lname,
				email: state.email,
				pass: state.password,
				phone: state.phone,
				user: true
				})
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
				<Header user={this.state.user} logout={this.logout} />
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
			<Header sp={this.state.sp} user={this.state.user} logout={this.logout} />
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
