import React, { Component } from 'react';
import injectStyle from 'react-jss';
import Title from '../components/Title';
import { Card, CardGroup } from 'react-bootstrap';
import moment from 'moment';
// import apiBase from '../api/apiBase'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      data: [],
      isLoading: true
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isLoading: false, data: this.props.data })
    }, 1000)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.homeContainer}>
        <div className={classes.stashesContainer}>
          <CardGroup className={classes.stashGroup}>
            {this.state.isLoading ?
              <div className={classes.loaderContainer}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }} />
              </div> :
              this.state.data.map(stash => {
                return (<Card key={stash.id} className={classes.stashList}>
                  <div className={classes.stashName}>
                    <Card.Header>
                      <Title key={stash.name} onClick='#'>{stash.name}</Title>
                    </Card.Header>
                    <Card.Body>
                    <p>{moment(stash.createdAt).format('YYYY-MM-DD')}</p>
                    </Card.Body>
                  </div>
                </Card>
                )
              })}
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
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    width:'100%',
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
    margin: '1%',
    width: '20%',
  },
  stashName: {
    textTransform: 'capitalize',
  },
}

export default injectStyle(styles)(Home);