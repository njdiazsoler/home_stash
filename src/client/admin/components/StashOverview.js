import React, { Component } from 'react';
import Title from '../components/Title';
import injectStyle from 'react-jss';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';

class StashOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formFields: {
        name: '',
        quantityAmount: '',
        quantityType: '',
        purchaseDate: '',
        estimatedDurability: '',
      },
      showNewItemModal: false,

    };
  }

  cancelForm = () => {
    const formFields = { name: '', quantity: '', purchaseDate: '', estimatedDurability: ''};
    this.setState({ showNewItemModal: !this.state.showNewItemModal, formFields: formFields });
  }

  handleChange = (e) => {
    const formFields = this.state.formFields;
    formFields[e.target.id] = e.target.value;
    console.log(e.target.id, e.target.value)
    this.setState({ formFields: formFields });
  }

  addNewItemModal = () => {
    return (
      <Modal show={this.state.showNewItemModal} onHide={() => this.setState({ showNewItemModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='name'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control type='text' placeholder='Enter item name here' value={this.state.formFields.name} onChange={this.handleChange} />
            </Form.Group>
            <Form.Row className={this.props.classes.quantityRow}>
              <Form.Group className={this.props.classes.quantityField} controlId='quantityAmount'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control  type='number' min='1' placeholder='Enter quantity here' value={this.state.formFields.quantity} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId='quantityType'>
                <Form.Label>Type</Form.Label>
                <Form.Control as='select' value={this.state.formFields.quantityType} onChange={this.handleChange}>
                <option value=''></option>
                <option value='units'>Units</option>
                <option value='kg'>Kilograms</option>
                <option value='lb'>Pounds</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId='purchaseDate'>
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control type='date' value={this.state.formFields.purchaseDate} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='estimatedDurability'>
              <Form.Label>Durability</Form.Label>
              <Form.Control type='date' min={this.state.formFields.estimatedDurability} value={this.state.formFields.estimatedDurability} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info'>Save Item</Button>
          <Button variant='secondary' onClick={this.cancelForm}>Cancel</Button>
        </Modal.Footer>
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
              <h5>Purchase Date</h5>
              <p>{item.purchaseDate}</p>
              <h5>Durability</h5>
              <p>{calculateDurability(item.purchaseDate, item.estimatedDurability)} day(s)</p>
              <div className={classes.buttonGroup}>
                <Button size='sm' variant='info'>Edit</Button>
                <Button size='sm' variant='secondary'>Delete</Button>
              </div>
              {/* </ListGroup.Item> */}
            </ListGroup>
          })}
          <Button className={classes.addNewButton} size='lg' variant='secondary' onClick={() => this.setState({ showNewItemModal: true })}>Add New Item</Button>
        </div>
      </div>
    )
  }
}

const calculateDurability = (pd, d) => {
  let start = new Date(pd);
  let end = new Date(d);
  return (end - start) / 86400000;
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
  quantityField: {
    width: '50%',
  },
  quantityRow: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start',
    marginLeft: '0',
    marginRight: '0',
  },
}

export default injectStyle(styles)(StashOverview);