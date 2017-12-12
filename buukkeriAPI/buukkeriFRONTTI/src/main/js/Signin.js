import Login from "./Login";
import Registration  from "./Reg";

const React = require ('react');

export default class Signin extends React.Component{
	constructor(props)
	{
		super(props);

	}
	render(){
		return(
		<signin className="container-fluid">
			<Login />
			<Registration />
		</signin>
		)
	}
}
