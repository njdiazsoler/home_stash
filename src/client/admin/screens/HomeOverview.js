import React, { Component } from 'react';
import injectStyle from 'react-jss';
import Title from '../components/Title';
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
    }, 2000)
  }

  render() {
    console.log(this.state.data.stashData);
    const { classes } = this.props;
    return (
      <div className={classes.homeContainer}>
        {this.state.isLoading ?
          <div className={classes.loaderContainer}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }} />
          </div> :
          this.state.data.map(stash => {
            return (
              <div key={stash.id} className={classes.stashName}>
                <Title key={stash.name} onClick='#'>{stash.name}</Title>
                <p>{stash.createdAt}</p>
              </div>)
          })}
        {/* <div>
          <Button variant='primary'>Create Stash</Button>
        </div> */}
      </div>
    )
  }
}

const styles = {
  homeContainer: {
    textAlign: 'center',
  },
  loaderContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'end',
  },
  stashName: {
    textTransform: 'capitalize',
  },
}

export default injectStyle(styles)(Home);