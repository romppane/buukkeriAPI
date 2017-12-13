import React from "react"
import {Route, Redirect} from "react-router-dom"


export default class AuthRoute extends React.Component {
	constructor(props){
    super(props);
    this.state = {
    		userObject:{},
			
			
    };
}
  componentWillMount() {
	  const user = JSON.parse(localStorage.getItem('someSavedState'))	
		this.setState({userObject: user})
		console.log(user)

}
  render() {

    if (!this.state.userObject.user && !this.state.userObject.sp) {

      return <Redirect to={this.props.redirectToLogin} />
    }else{
    	
    return <Route path={this.props.path} component={this.props.component}/>
  }
  }
}
