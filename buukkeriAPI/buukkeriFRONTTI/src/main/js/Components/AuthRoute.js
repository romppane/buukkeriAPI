import React from "react"
import {Route, Redirect} from "react-router-dom"


export default class AuthRoute extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			id: 0,
			name: "",
			fname:"",
			lname:"",
	    email: "",
	    pass: "",
			phone: "",
			user:false,
			sp: false,
			
    };
}
  componentWillMount() {

	  
	  	const user = JSON.parse(localStorage.getItem('someSavedState'))
	  if(user.user){
		  this.setState({id: user.id,
		  fname: user.fname,
		  lname: user.lname,
		  email: user.email,
		  pass: user.password,
		  phone: user.phone,
		  user: true
		  })
		  
			console.log(user.user)
	  }else if(user.sp){
		  this.setState({id: user.id,
			  name: user.name,
			  email: user.email,
			  pass: user.password,
			  phone: user.phone,
			  sp: true
			  })
			  
				console.log(user.sp)
	  }

  
}
  render() {

    if (!this.state.user && !this.state.sp) {

      return <Redirect to={this.props.redirectToLogin} />
    }else{
    	
    return <Route path={this.props.path} component={this.props.component}/>
  }
  }
}
