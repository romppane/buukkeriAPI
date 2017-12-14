import React from 'react';
import {callUser} from '../AjaxPutPostDelete';
export default class Button extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    if(this.props.shift.userId==0){
      const shift = this.props.shift;
      shift.userId=this.props.userid;
    callUser("PUT","shifts/",JSON.stringify(shift)).then((response)=>{
      console.log(response)
      this.props.onClick(response)
    })
    }else{
      this.props.onClick(false);
    }
  }
  render(){
    return(
      <button className={this.props.className}  onClick={this.onClick} >
      {this.props.name}
      </button>
    );
  }
}
