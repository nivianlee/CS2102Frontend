import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';

import Homepage from './containers/homepage';
import Login from './containers/login';
import FDSManagers from './containers/fdsManagers';
import Restaurants from './containers/restaurants';

import Sidebar from './components/sidebar';
import Topbar from './components/topbar';

import * as Reducer from './reducers/reducers.js';

//for the appbar and drawer
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const rootReducer = combineReducers({
  reducer: Reducer.reducer,
});

const store = createStore(rootReducer);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  let pathname = props.history.location.pathname;
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    setMobileOpen(false);
    if (pathname === '/fdsmanagers') {
      setSelectedItem(0);
    }
    if (pathname === '/restaurants') {
      setSelectedItem(1);
    }
    if (pathname === '/manage-students') {
      setSelectedItem(2);
    }
    if (pathname === '/message-logging') {
      setSelectedItem(3);
    }
    if (pathname === '/admin-logging') {
      setSelectedItem(4);
    }
    if (pathname === '/manage-accounts') {
      setSelectedItem(5);
    }
  }, [props.history.location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectedItem = (event, index) => {
    setSelectedItem(index);

    if (index === 0) {
      props.history.push('/fdsmanagers');
    }
    if (index === 1) {
      props.history.push('/restaurants');
    }
    if (index === 2) {
      props.history.push('/manage-students');
    }
    if (index === 3) {
      props.history.push('/message-logging');
    }
    if (index === 4) {
      props.history.push('/admin-logging');
    }
    if (index === 5) {
      props.history.push('/manage-accounts');
    }
  };

  const handleLogout = () => {
    props.history.push('/logout');
  };

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <CssBaseline />
        {pathname === '/login' ? (
          ''
        ) : (
          <Topbar handleDrawerToggle={handleDrawerToggle} handleLogout={handleLogout} pathname={pathname} />
        )}
        {pathname === '/login' || pathname === '/logout' ? (
          <></>
        ) : (
          <nav className={classes.drawer} aria-label='mailbox folders'>
            <Sidebar
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
              handleSelectedItem={handleSelectedItem}
              selectedItem={selectedItem}
            />
          </nav>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/fdsmanagers' component={FDSManagers}></Route>
            <Route exact path='/restaurants' component={Restaurants}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Redirect from='/' to='fdsmanagers' />
          </Switch>
        </main>
      </div>
    </Provider>
  );
};

export default withRouter(App);
