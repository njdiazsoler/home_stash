import React, { Component } from 'react';
import Title from '../components/Title';
import injectStyle from 'react-jss';
import { Button, ListGroup, Modal } from 'react-bootstrap';

class StashOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewItemModal: false
    };
  }

  addNewItemModal = () => {
    return (
      <Modal show={this.state.showNewItemModal} onHide={() => this.setState({ showNewItemModal: false })}>
      </Modal>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.overviewContainer}>
        {this.addNewItemModal()}
        <Title style={{ borderBottom: '2px solid black', paddingBottom: '2%', textTransform: 'capitalize', margin: '2% 5% 0' }}>{this.props.data.name}</Title>
        <div className={classes.itemsContainer}>
          {this.props.data.items.map(function (item) {
            return <ListGroup className={classes.listItem} key={item.id}>
              {/* <ListGroup.Item> */}
              <h2>{item.name}</h2>
              <p>{item.purchaseDate}</p>
              <p>{item.durability}</p>
              <div className={classes.buttonGroup}>
                <Button size='sm' variant='info'>Edit</Button>
                <Button size='sm' variant='secondary'>Delete</Button>
              </div>
              {/* </ListGroup.Item> */}
            </ListGroup>
          })}
          <Button className={classes.addNewButton} size='lg' variant='primary'>Add New Item</Button>
        </div>
      </div>
    )
  }
}

const styles = {
  addNewButton: {
    height: '5%',
  },
  buttonGroup: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-evenly',
  },
  itemsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-evenly',
    padding: '2%',
  },
  listItem: {
    backgroundColor: '#C9A468',
    border: '1px solid black',
    borderRadius: '15%',
    boxShadow: '5px 5px 2px grey',
    color: 'black',
    height: '10%',
    margin: '1%',
    padding: '2% 0%',
    width: '25%',
  },
  overviewContainer: {
    position: 'relative',
    width: '100%',
  },
}

export default injectStyle(styles)(StashOverview);