const React = require ('react');
const styles = {
  width: "14rem"
};
const styles2 = {
  width: "10rem"
};

export default class Input extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    const value = e.target.value;


    this.props.onChange(value);
  }
	  render() {
	    return (
          <li className="list-group-item">
          <label style={styles2}>{this.props.label}</label>
          <input key="name" type={this.props.type}onChange={this.onChange} style={styles} ></input>
          <label style={styles}>{this.props.status}</label>
          </li>
	    );
	  }
	}
  Input.propTypes = {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  };
