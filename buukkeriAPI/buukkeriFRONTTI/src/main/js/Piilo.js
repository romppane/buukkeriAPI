const React = require ('react');

export default class Piilo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			id: 0,
			fname:"",
			lname:"",
	    email: "",
	    pass: "",
			phone: "",
			user:false
    };
}
  componentWillMount() {
  const user = localStorage.getItem('someSavedState')
  this.setState({id: user.id,
  fname: user.fname,
  lname: user.lname,
  email: user.email,
  pass: user.password,
  phone: user.phone,
  user: true
  })
	console.log(user)
}
  render() {
    return (
    <h1>Penan äiti oli täällä </h1>
    );
  }
}
