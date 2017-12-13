import {strings} from "./LocalizationStrings";

const React = require ('react');

import {callBookker} from "./ajaxGet";

export default class Login extends React.Component{
	  constructor(props){
	    super(props);
	    this.state = {
	      modalVisble: 'hidden',
			email: "",
			password: ""
	    };



	    this.toggleModal = this.toggleModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleEmail = this.handleEmail.bind(this);
	    this.handlePassword = this.handlePassword.bind(this);


	  }
	  componentDidMount(){

	  }
	  toggleModal(){
	    this.setState({modalVisble: 'visible'});
	  }
	  closeModal(){
	    this.setState({modalVisble: 'hidden'});
	  }



	  handleEmail(e){
		  this.setState({email: e.target.value})
	  }
	  handlePassword(e){
		  this.setState({password: e.target.value})
	  }

	  handleSubmit(){
		  let user = {
				  fname : this.state.fname,
				  lname : this.state.lname,
				  email : this.state.email,
				  phone : this.state.phone,
				  password : this.state.password
			  }
		  console.log("pläää")
		  console.log(user.password)
		  console.log(JSON.stringify(user))
		  console.log(callUser("POST",LOCALHOST+"users/",JSON.stringify(user)))


	  }
render(){
		return (
			 <signin className="modalDialog">
		        <button className="btn btn-success btn-lg" onClick={(e) => this.toggleModal(e)} value="login" > {strings.login} </button>
		        <div className={"form-wrapper modal " + this.state.modalVisble }  >
		        <form name="form" className="form-inline" id="form-submit-data" onSubmit={this.handleSubmit}>

							<div className="form-group">
							<input key="email" type="text" placeholder={strings.email} ref="email" onChange={this.handleEmail}  value={this.state.email}/>
						</div>,

							<div className="form-group">
							<input key="password" type="password" placeholder={strings.password} ref="password" onChange={this.handlePassword}  value={this.state.pass}/>
						</div>
				          	<button type="button" className="btn btn-primary" value="Submit"  onClick={this.handleSubmit}>{strings.submit}</button>
				          	<button className="btn btn-primary" onClick={(e) => this.closeModal(e)} value="close modal"><small>{strings.close}</small></button>
		          </form>

		        </div>
		      </signin>
	    )
	  }

}
