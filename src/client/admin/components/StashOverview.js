import React, {Component} from 'react';

class StashOverview extends Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  render(){
    return(
      <div>
        <h2>{this.props.data.name}</h2>
      </div>
    )
  }
}

export default StashOverview;