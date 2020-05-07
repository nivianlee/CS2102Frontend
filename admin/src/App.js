import React, { useState, useEffect } from 'react';
import './App.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';

import Home from './containers/home';
import Login from './containers/login';
import FDSManagers from './containers/fdsManagers';
import Restaurants from './containers/restaurants';
import Restaurant from './containers/restaurant';
import Riders from './containers/riders';
import Schedule from './containers/schedule';
import Order from './containers/order';
import Promotion from './containers/promotion';
import Promotions from './containers/promotions';
import Profile from './containers/profile';
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
    if (pathname === '/home') {
      setSelectedItem(0);
    }
    if (pathname === '/order') {
      setSelectedItem(1);
    }
    if (pathname === '/promotions') {
      setSelectedItem(2);
    }
    if (pathname === '/my-promotion') {
      setSelectedItem(3);
    }
    if (pathname === '/my-restaurant') {
      setSelectedItem(4);
    }
    if (pathname === '/restaurants') {
      setSelectedItem(5);
    }
    if (pathname === '/my-schedule') {
      setSelectedItem(6);
    }
    if (pathname === '/riders') {
      setSelectedItem(7);
    }
    if (pathname === '/fdsmanagers') {
      setSelectedItem(8);
    }
  }, [props.history.location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectedItem = (event, index) => {
    setSelectedItem(index);

    if (index === 0) {
      props.history.push('/home');
    }
    if (index === 1) {
      props.history.push('/order');
    }
    if (index === 2) {
      props.history.push('/promotions');
    }
    if (index === 3) {
      props.history.push('/my-promotion');
    }
    if (index === 4) {
      props.history.push('/my-restaurant');
    }
    if (index === 5) {
      props.history.push('/restaurants');
    }
    if (index === 6) {
      props.history.push('/my-schedule');
    }
    if (index === 7) {
      props.history.push('/riders');
    }
    if (index === 8) {
      props.history.push('/fdsmanagers');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push('/');
  };

  const handleProfile = () => {
    props.history.push('/profile');
  };

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <CssBaseline />
        {pathname === '/login' ? (
          ''
        ) : (
          <Topbar
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            handleProfile={handleProfile}
            pathname={pathname}
          />
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
            <Route exact path='/promotions' component={Promotions}></Route>
            <Route exact path='/my-promotion' component={Promotion}></Route>
            <Route exact path='/my-restaurant' component={Restaurant}></Route>
            <Route exact path='/restaurants' component={Restaurants}></Route>
            <Route exact path='/order' component={Order}></Route>
            <Route exact path='/my-schedule' component={Schedule}></Route>
            <Route exact path='/riders' component={Riders}></Route>
            <Route exact path='/fdsmanagers' component={FDSManagers}></Route>
            <Route exact path='/profile' component={Profile}></Route>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Redirect from='/' to={sessionStorage.getItem('id') ? 'home' : 'login'} />
          </Switch>
        </main>
      </div>
    </Provider>
  );
};

export default withRouter(App);
