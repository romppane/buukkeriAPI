const React = require ('react');





export default class Footer extends React.Component {
	  render() {
	    return (
	    		<footer id="footer" className="footercomponent">@{new Date().getFullYear()} vapaatvuorot.fi</footer>
	    );
	  }
	}
