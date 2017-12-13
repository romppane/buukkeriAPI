const React = require ('react');
import Language from "./Language";

export default class Footer extends React.Component {
	  render() {
	    return (
	    		<footer id="footer" className="footercomponent">
					<p>@{new Date().getFullYear()} vapaatvuorot.fi</p>
					<Language />
					</footer>
	    );
	  }
	}
