import React, { Component } from 'react';
import Home from './client/admin/screens/HomeOverview';
import './App.css';
import injectStyle from 'react-jss';
import SideBar from './client/admin/components/SideBar';
import { Route, Switch } from "react-router-dom";
import StashOverview from './client/admin/components/StashOverview';
import colours from './client/resources/Colours'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    }
  }

  componentDidMount = async () => {
    try {
      let data = await fetch('http://localhost:3002/home')
        .then(response => response.json())
      // this.setState({ data: data.stashData , isLoading: false });
      setTimeout(() => {
        this.setState({  data: data.stashData, isLoading: false })
      }, 1000)
    } catch (error) {
      throw console.log('error is ', error)
    }
  }

  handleRoute = ({ match, location, history }) => {
    if (this.state.data) {
      const stashData = this.state.data;
      if (match.url !== '/home' && match.url !== '/' && match.url !== '/home/') {
        let curStash = {};
        stashData.forEach(function (stash) {
          if (stash.name === match.params.id) {
            curStash = stash;
          }
        })
        return <StashOverview data={curStash} key={location.pathname} location={location} history={history} refresh={() => this.refreshItemList(curStash)} />
      } else {
        return <Home data={this.state.data} />
      }
    } return null
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div className={classes.sideBarContainer}>
          <SideBar data={this.state.data} />
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
    marginLeft: '15%',
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
    backgroundColor: colours.primary,
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    position: 'fixed',
    width: '15%',
  },
}

export default injectStyle(styles)(App);
