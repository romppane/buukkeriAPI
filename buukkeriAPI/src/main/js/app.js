/**
 * @author Tommi Rokolampi
 */


const React = require ('react');
const ReactDOM = require ('react-dom');
//const client = require ('./client');



function callBookker(url){
	retrurn new Promise((resolve, reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.open('GET',url);
		xhr.onload = ()=> resolve(xhr.responseText);
		xhr.onerror = ()=> reject(xhr.statusText);
	});
	
}
class Header extends React.Component {
	  render() {
	    return (
	      <header>
	        <h1>
	          <a id="headerlink" href="vapaatvuorot.fi">
	            <em>vapaatvuorot.fi</em>
	          </a>
	        </h1>
	      </header>
	    );
	  }
	}
	class Sign_In extends React.Component {
	  render() {
	    return (
	      <signin>
	        <button onClick="" className="btn btn-primary btn-lg btn-block">
	          Kirjaudu sisään
	        </button>
	      </signin>
	    );
	  }
	}

	class App extends React.Component {
	  /*
	  constructor(props){
	    super(props);
	  }
	  */
	  render() {
	    return (
	      <app id="app" className="Appcomponent">
	        <ControlPanel />
	        <Schedule />
	      </app>
	    );
	  }
	}

	class ControlPanel extends React.Component {
	  /*
	  constructor(props){
	    super(props);
	  }
	  */
	  render() {
	    return (
	      <div id="cpanel" className="controlpanelcomponent">
	        controlpaneeelli
	        <SportButton />
	      </div>
	    );
	  }
	}

	//Testaus metodi nappuloiden tekemisellä

	//mapataan listan tavarat luotaviin nappuloihin

	class SportButton extends React.Component {
	  componentDidMount() {}
	  render() {
	    const sports = [
	      "Icehockey",
	      "Football",
	      "Tennis",
	      "Poledance",
	      "Skateboarging",
	      "Skillskating",
	      "Golf",
	      "Swimming",
	      "Badmington"
	    ];

	    const sportsButtons = sports.map(item => <button id="button" className="btn btn-primary btn-block">{item}</button>);
	    return (<div id="buttongroup" className="btn-group btn-group-lg">{sportsButtons}</div>);
	  }
	}
	                                     
	                                     
	class Schedule extends React.Component {
	  render() {
	    return (
	      <div id="schedule" className="">
	        <div id='schedule1' className="well">
	        </div>
	        <div className="well">
	          </div>
	      </div>
	    );
	  }
	}

	class Footer extends React.Component {
	  render() {
	    return (
	      <footer id="footer" className="footercomponent">
	        Footer
	      </footer>
	    );
	  }
	}

	class Main extends React.Component {
	  render() {
	    return (
	      <main className="mainComponent">
	        <Header />
	        <Sign_In />
	        <App />
	        <Footer />
	      </main>
	    );
	  }
	}

	ReactDOM.render(<Main />, document.getElementById("react"));
