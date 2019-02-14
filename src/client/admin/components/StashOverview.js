// import ApiBase from '../api/apiBase'
import injectStyle from 'react-jss';
import React, { Component } from 'react';
import Title from '../components/Title';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import moment from 'moment';
import colours from '../../resources/Colours';

class StashOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmAction: false,
      currentItem: '',
      data: this.props.location.state,
      deletingUser: false,
      editingItem: false,
      history: this.props.history || false,
      itemData: [],
      formFields: {
        estimatedDurability: '',
        name: '',
        quantityAmount: '',
        quantityType: '',
        purchaseDate: '',
      },
      isLoading: true,
      showForm: false,
    };
  }

  addNewItem = item => {
    const newItemData = this.state.itemData.slice();
    newItemData.push(item);
    this.setState({ itemData: newItemData });
  }

  cancelForm = () => {
    const formFields = { name: '', quantityAmount: '', quantityType: '', purchaseDate: '', estimatedDurability: '' };
    this.setState({ showForm: !this.state.showForm, formFields: formFields });
  }

  componentDidMount = () => {
    this.getItems();
  }

  deleteItem = () => {
    const { currentItem } = this.state;
    const itemList = this.state.itemData.slice();
    console.log('DELETE request to API, using data: ', JSON.stringify(currentItem));
    fetch(`http://localhost:3002${this.props.location.pathname}/${currentItem.id}`, {
      method: 'delete',
    })
      .then(response => { return response.json() })
      .then(response => {
        itemList.forEach((e, i) => {
          if (e.id === currentItem.id) {
            itemList.splice(i, 1);
            this.setState({ itemData: itemList });
          }
        })
        this.setState({ currentItem: '', confirmAction: false, deletingUser: false });
      });
  }

  editItem = () => {
    this.state.itemData.forEach((item, index) => {
      if (item.id === this.state.currentItem.id) {
        this.state.itemData.splice(index, 1, this.state.currentItem);
      }
    })
    this.cancelForm();
    this.setState({ currentItem: '', editingItem: false });
  }

  getItems = () => {
    fetch(`http://localhost:3002${this.props.location.pathname}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ itemData: result, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleChange = (e) => {
    const formFields = this.state.formFields;
    formFields[e.target.id] = e.target.value;
    this.setState({ formFields: formFields });
  }

  handleDelete = (item) => {
    this.setState({ confirmAction: true, currentItem: item, deletingUser: true });
  }

  handleEdit = (item) => {
    let itemCopy = Object.assign({}, item);
    this.setState({ currentItem: itemCopy, formFields: itemCopy, editingItem: true, showForm: true });
  }

  handleSubmit = () => {
    const { formFields } = this.state;
    if (formFields) {
      formFields.stashId = this.props.data.id;
      console.log('form fields are: ', formFields);
      this.submitForm({ formFields });
    }
  }

  saveChanges = () => {
    console.log(`PUT request to API ${this.props.location.pathname}/${this.state.currentItem.id}, using data: `, JSON.stringify(this.state.formFields));
    fetch(`http://localhost:3002${this.props.location.pathname}/${this.state.currentItem.id}`,
      {
        method: 'put',
        body: JSON.stringify(this.state.formFields),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => { return response })
      .then(() => this.editItem())
      .catch(error => this.setState({ error }));
  }

  submitForm = (opts) => {
    console.log(`POST request to API ${this.props.location.pathname}, using data: `, JSON.stringify(this.state.formFields));
    fetch(`http://localhost:3002${this.props.location.pathname}/`,
      {
        method: 'post',
        body: JSON.stringify(opts.formFields),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => { return response.json(); })
      .then(response => {
        this.setState({ showForm: false }, this.addNewItem(response))
      })
      .catch(error => this.setState({ error, isLoading: false }));
    this.cancelForm();
  }

  confirmActionModal = () => {
    const { classes } = this.props;
    return (<Modal show={this.state.confirmAction} onHide={() => this.setState({ confirmAction: false })}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {this.state.currentItem.name} permanently?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className={classes.primaryButton} variant='primary' onClick={this.deleteItem}>Delete Item</Button>
        <Button variant='secondary' onClick={() => this.setState({ confirmAction: false })}>Cancel</Button>
      </Modal.Footer>
    </Modal>)
  }

  addNewItemModal = () => {
    console.log(this.props.location)

    const { classes } = this.props;
    return (
      <Modal show={this.state.showForm} onHide={() => this.setState({ showForm: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='name'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control type='text' placeholder='Enter item name here' value={this.state.formFields.name} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Row className={this.props.classes.quantityRow}>
              <Form.Group className={this.props.classes.quantityField} controlId='quantityAmount'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' min='1' placeholder='Enter quantity here' value={this.state.formFields.quantityAmount} onChange={this.handleChange} />
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
              <Form.Control type='date' value={moment(this.state.formFields.purchaseDate).format('YYYY-MM-DD')} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='estimatedDurability'>
              <Form.Label>Durability</Form.Label>
              <Form.Control type='date' min={this.state.formFields.estimatedDurability} value={moment(this.state.formFields.estimatedDurability).format('YYYY-MM-DD')} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {this.state.editingItem ?
            <Button className={classes.primaryButton} variant='primary' onClick={this.saveChanges}>Save Item</Button> :
            <Button className={classes.primaryButton} variant='primary' onClick={this.handleSubmit}>Save Item</Button>
          }
          <Button variant='secondary' onClick={this.cancelForm}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.overviewContainer}>
        <div className={classes.containerHeader}>
        <Title className={classes.headerTitle}>{this.props.location.state}</Title>
        <Button className={classes.addNewButton} size='lg' variant='secondary' onClick={() => this.setState({ showForm: true })}>Add New Item</Button>
          </div>
        {this.addNewItemModal()}
        {this.confirmActionModal()}
        <div className={classes.itemsContainer}>
          {this.state.isLoading ?
            <div className={classes.loaderContainer}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }} />
            </div> :
            this.state.itemData && this.state.itemData.length > 0 ?
              this.state.itemData.map(item => {
                let purchaseDate = moment(item.purchaseDate)
                let estimatedDurability = moment(item.estimatedDurability).startOf('day')
                return <ListGroup className={classes.listItem} key={item.id}>
                  <h2 className={classes.itemName}>{item.name}</h2>
                  <h5>Purchase Date</h5>
                  <p>{purchaseDate.format('DD/MM/YYYY')}</p>
                  <h5>Durability</h5>
                  <p>{moment(estimatedDurability - purchaseDate).format('D[ day(s)]')}</p>
                  <div className={classes.buttonGroup}>
                    <Button size='sm' className={classes.primaryButton} onClick={() => this.handleEdit(item)} variant='primary'>Edit</Button>
                    <Button size='sm' variant='secondary' onClick={() => this.handleDelete(item)}>Delete</Button>
                  </div>
                  {/* </ListGroup.Item> */}
                </ListGroup>
              }) :
              <div></div>}
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
  containerHeader: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    margin: '0 2.5%',
  },
  headerTitle: { 
    borderBottom: '2px solid black', 
    paddingBottom: '1%', 
    textTransform: 'capitalize', 
    margin: '3% 2%',
    textAlign: 'left',
    width: '100%',
  },
  itemsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    padding: '2%',
  },
  itemName: {
    textTransform: 'capitalize',
  },
  listItem: {
    backgroundColor: colours.primary,
    border: '1px solid black',
    borderRadius: '15%',
    boxShadow: '5px 5px 2px grey',
    color: 'white',
    height: '10%',
    margin: '1%',
    padding: '2% 0%',
    width: '25%',
  },
  loaderContainer: {
    position: 'relative',
    maxHeight: '80vh',
    maxWidth: '80vw',
  },
  primaryButton: {
    backgroundColor: colours.secondary,
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