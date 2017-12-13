import SportButton from './Components/SportButton';
import {callBookker} from "./ajaxGet";
import Header from "./Header";
import Footer from "./Footer";
import {
	  BrowserRouter as Router,
	  Route,
	  Link,
		Switch
	} from 'react-router-dom';
import {strings} from "./LocalizationStrings";

const React = require ('react');


export default class App extends React.Component {

	  constructor(props){
	    super(props);
	    this.state={
	    		sportid: 0,
	    		sports:[],
	    		activities: [],
					user:false
	    };
	    this.handleState=this.handleState.bind(this);
			this.logout = this.logout.bind(this);

	  }
	  componentDidMount() {
		  // HAETAAN KANNASTA SPORTTIEN NIMIÄ
		  callBookker("sports").then((data)=>{
				data = JSON.parse(data);
				this.setState({sports: data});

		  });


	  }
		componentWillMount() {
			const state = JSON.parse(localStorage.getItem('someSavedState'))

				this.setState({
				user: state.user

				})
				console.log(state.user)
		}
		componentWillUnmount() {
	  localStorage.setItem('someSavedState', JSON.stringify(this.state))
		}
		logout(value){
				this.setState({
			  user:value
			  })
		}

	  handleState(newState){
		  this.setState({sportid: newState });

		  callBookker("/act/sportID="+newState).then((data)=>{
				data = JSON.parse(data);
				this.setState({activities: data});

		  });
	  }
	  render() {
	    return (
				<main>
				<Header user={this.state.user} logout={this.logout} />
	      <app id="app" className="Appcomponent">
	      	<SportButton sportid={this.state.sportid} onClick={this.handleState} sports={this.state.sports}/>
	      	<Schedule activities={this.state.activities} / >
	      </app>
				<Footer />
				</main>
	    );
	  }
	}

// SCHEDULE
	class Schedule extends React.Component {
		constructor(props)
		{
			super(props);
			this.state={sports: []}
			this.omgolen = this.omgolen.bind(this);
		}
		omgolen(id){
			return "/Booking"+id.toString();
		}
	  render() {

			const availableActivities = this.props.activities.map((item)=>
			<li key={item.id} value={item.id} id="lists"  className="act-list">
			<a>{item.name}</a>{"	"+item.location+"		" + item.description}
			<Link className="btn btn-primary btn pull-right" to={this.omgolen(item.id)}>
			{strings.book}</Link> </li>)

		 return (
	        <app>
	        	<ul>
	        	{availableActivities}
	        	</ul>
	        </app>
	    );
	  }
	}
