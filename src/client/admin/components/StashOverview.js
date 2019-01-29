import React, { Component } from 'react';
import Title from '../components/Title';
import { Button, ListGroup } from 'react-bootstrap';

class StashOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    return (
      <div>
        <Title>{this.props.data.name}</Title>
        <div>
          {this.props.data.items.map(function (item) {
            return <ListGroup key={item.id}>
              {/* <ListGroup.Item> */}
                <h2>{item.name}</h2>
                <p>{item.purchaseDate}</p>
                <div>
                  <Button size='sm' variant='info'>Edit</Button>
                  <Button size='lg' variant='outline-primary'>Delete</Button>
                </div>
              {/* </ListGroup.Item> */}
            </ListGroup>
          })}
        </div>
      </div>
    )
  }
}

export default StashOverview;