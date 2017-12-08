const React = require ('react');
const ReactDOM = require ('react-dom');
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
	import LocalizedStrings from 'react-localization';
	import {strings} from './LocalizationStrings';

export default class UserPage extends React.Component{
	constructor(props)
	{
		super(props)
	}

	render(){
		return(
			<app>
			<ul>
			<li></li>
			</ul>

			</app>

		)
	}
}
