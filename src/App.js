import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import { Route, Switch } from "react-router-dom";
import StashOverview from './client/admin/components/StashOverview';
// import ApiBase from './client/admin/api/apiBase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      data: [],
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3002/home')
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result });
      })
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 5000)
  }

  handleClick = () => {

  }

  handleRoute = ({ match, location }) => {
    const stashData = this.state.data.stashData;
    if (match.url !== '/home' && match.url !== '/' && match.url !== '/home/') {
      let curStash = {};
      stashData.forEach(function (stash) {
        if (stash.name === match.params.id) {
          curStash = stash;
        }
      })
      return <StashOverview data={curStash} key={location.pathname} location={location} refresh={() => this.refreshItemList(curStash)} />
    } else {
      return <Home data={this.state.data.stashData} />
    }
  }

  refreshItemList = (data) => {
    console.log('refreshing data...');
    this.setState({ data: data })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div className={classes.sideBarContainer}>
          <SideBar onClick={this.handleClick} data={this.state.data} />
        </div>
        <div className={classes.contentContainer}>
          <h1>Home Stash</h1>
          <Switch>
            <Route exact path='/' render={this.handleRoute} />
            <Route exact path='/home' render={this.handleRoute} />
            <Route exact path='/home/' render={this.handleRoute} />
            <Route path='/home/:id' render={this.handleRoute} />
          </Switch>
        </div>
      </div>
    );
  }
}



const styles = {
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    width: '85%',
  },
  loaderContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '50%',
  },
  sideBarContainer: {
    alignItems: 'center',
    backgroundColor: '#BE8629',
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    width: '13%'
  },
}

export default injectStyle(styles)(App);
