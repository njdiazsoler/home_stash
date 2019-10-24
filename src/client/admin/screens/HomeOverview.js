import React, { Component } from 'react';
import injectStyle from 'react-jss';
import Title from '../components/Title';
import { Card, CardGroup } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    let data = this.props.data || null;
    this.state = {
      response: '',
      data: data,
      isLoading: true
    }
  }

  componentDidMount = () => {
    // console.log(this.props.data);
    // setTimeout(() => {
    //   this.setState({ isLoading: false })
    // }, 1000)
  }

  // showSpinner = () => {
  //   console.log('pasa por spinner')
  //   const { classes } = this.props;
  //   // this.setState({ data: this.props.data });
  //   if (this.state.isLoading) {
  //     return (

  //     )
  //   }
  // }

  // showData = () => {
  //   console.log('cambiando estado...')
  //   const { classes } = this.props;
  //   this.setState({ isLoading: false, data: this.props.data });
  //   return (

  //   )
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.homeContainer}>
        <div className={classes.stashesContainer}>
          <CardGroup className={classes.stashGroup}>
          {this.props.data && this.props.data.length === 0 ?
            <div className={classes.loaderContainer}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }} />
            </div> :
            this.props.data.map(stash => {
              return (
                <Card key={stash.id} className={classes.stashList}>
                <div className={classes.stashName}>
                  <Card.Header>
                  <Title key={stash.name} onClick='#'>{stash.name}</Title>
                  </Card.Header>
                    <Card.Body>
                  <div className={classes.itemList}>
                    {stash.items.map(item => {
                      return (
                        <div key={item.id} className={classes.itemRow}>
                          <p>{item.name}</p>
                          <p className={classes.duration}>{item.durability}</p>
                        </div>
                      )
                    })
                    }
                  </div>
                  </Card.Body>
                </div>
                </Card>
              )
            })
          }
          </CardGroup>
        </div>
        {/* <div>
          <Button variant='primary'>Create Stash</Button>
        </div> */}
      </div>
    )
  }
}

const styles = {
  duration: {
    textAlign: 'right',
    textTransform: 'none'
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  itemList: {

  },
  itemName: {
    display: 'flex',
    textAlign: 'left',
  },
  itemRow: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  },
  loaderContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stashesContainer: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    padding: '2%',
    width: '100%',
  },
  stashGroup: {
    justifyContent: 'center',
    width: '100%'
  },
  stashList: {
    boxShadow: '5px 5px 2px grey',
    margin: '1%',
    width: '20%',
  },
  stashName: {
    textTransform: 'capitalize',
  },
}

export default injectStyle(styles)(Home);