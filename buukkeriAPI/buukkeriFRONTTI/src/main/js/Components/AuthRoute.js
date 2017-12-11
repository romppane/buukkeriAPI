import React, {PropTypes} from "react"
import {Route, Redirect} from "react-router-dom"
import Piilo from './../Piilo';
export default class AuthRoute extends React.Component {
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
  const user = JSON.parse(localStorage.getItem('someSavedState'))
  this.setState({id: user.id,
  fname: user.fname,
  lname: user.lname,
  email: user.email,
  pass: user.password,
  phone: user.phone,
  user: user.user
  })
  console.log(user.email);
	console.log(user.user);
}
  render() {

    if (!this.state.user) {

      return <Redirect to={this.props.redirectToLogin} />
    }
    return <Route path={this.props.path} component={this.props.component}/>
  }
}
