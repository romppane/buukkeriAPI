const React = require ('react');
const ReactDOM = require ('react-dom');


import LocalizedStrings from 'react-localization';
import {strings} from './LocalizationStrings';
import App from "./Application";
import {callBookker} from "./ajaxGet";
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';

	
export default class BookingPage extends React.Component{
	constructor(props)
	{
		super(props)
	}
	render(){
		return(
		<app>
			<ul>
			<li>pläää</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			</ul>
		</app>
		)
	}
}