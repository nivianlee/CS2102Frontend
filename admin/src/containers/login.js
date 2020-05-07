import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AddAlert from '@material-ui/icons/AddAlert';

import * as AccountsApis from '../api/accounts';
import * as FDSManagersApis from '../api/fdsManagers';
import * as RestaurantsApis from '../api/restaurants';
import * as RestaurantStaffApis from '../api/restaurantstaff';
import * as RidersApis from '../api/riders';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCreate: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    paddingTop: '10%',
  },
  input: {
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userButton: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rerequestOTP: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginTop: '5%',
    backgroundColor: '#eee',
    width: '100%',
    height: '1px',
  },
  counter: {
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [redirectHomepage, setRedirectHomepage] = useState(false);
  const [requestOTP, setRequestOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [counter, setCounter] = useState(60);
  const [register, setRegister] = useState(false);
  const [hasSelectedUserType, setHasSelectedUserType] = useState(false);
  const [contactNum, setContactNum] = useState('');
  const [noUserFound, setNoUserFound] = useState(false);
  const [isNewRestaurant, setIsNewRestaurant] = useState(false);
  const [newRider, setNewRider] = useState({
    riderName: '',
    riderEmail: '',
    contactNum: '',
    isOccupied: false,
    isFullTime: false,
    baseSalary: 0,
  });
  const [newFDSManager, setNewFDSManager] = useState({
    managerName: '',
    contactNum: '',
  });
  const [newRestaurantStaff, setNewRestaurantStaff] = useState({
    restaurantStaffName: '',
    contactNum: '',
    restaurantID: '',
  });
  const [newRestaurant, setNewRestaurant] = useState({
    restaurantName: '',
    minOrderCost: '',
    contactNum: '',
    address: '',
    postalCode: '',
  });
  const [restaurantID, setRestaurantID] = useState(-1);
  const [errorContactNumNotFound, setErrorContactNumNotFound] = useState(false);
  const [errorRestIDNotFound, setErrorRestIDNotFound] = useState(false);

  const createNewUser = () => {
    if (props.loggedInUserType === 'deliveryRider') {
      createRider();
    } else if (props.loggedInUserType === 'restaurantStaff') {
      if (isNewRestaurant) {
        createRestaurant();
      } else {
        createRestaurantStaff();
      }
    } else {
      createFDSManager();
    }
  };

  const createRider = async () => {
    RidersApis.createRiders(newRider)
      .then((response) => {
        if (response.status !== 201) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error creating delivery rider. Please contact administrators for assistance',
          });
        }
        setNotification('Delivery rider has been created! Please login again.');
        showNotification();

        setRegister(false);
        setHasSelectedUserType(false);
        setNoUserFound(false);
        setContactNum('');

        props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: '' });
        clearNewUsersObjects();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error creating delivery rider. Please contact administrators for assistance',
        });
      });
  };

  const createRestaurantStaff = async () => {
    RestaurantsApis.getRestaurantById(newRestaurantStaff.restaurantID).then((response) => {
      if (response.status !== 201) {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error finding restaurant. Please contact administrators for assistance',
        });
      }
      if (response.data.length === 1) {
        RestaurantStaffApis.createRestaurantStaff(newRestaurantStaff)
          .then((response) => {
            if (response.status !== 201) {
              props.dispatch({
                type: 'SET_ERRORMESSAGE',
                data: 'Error creating restaurant staff. Please contact administrators for assistance',
              });
            }
            setNotification('Restaurant staff has been created! Please login again.');
            showNotification();

            setRegister(false);
            setHasSelectedUserType(false);
            setNoUserFound(false);
            setContactNum('');
            setRestaurantID(-1);

            props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: '' });
            clearNewUsersObjects();
          })
          .catch((err) => {
            props.dispatch({
              type: 'SET_ERRORMESSAGE',
              data: 'Error creating restaurant staff. Please contact administrators for assistance',
            });
          });
      } else {
        setErrorRestIDNotFound(true);
      }
    });
  };

  const createRestaurant = async () => {
    RestaurantsApis.createRestaurant(newRestaurant)
      .then((response) => {
        if (response.status !== 201) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error creating restaurant. Please contact administrators for assistance',
          });
        }
        setNotification('Restaurant has been created! Please create a restaurant staff belonging to restaurant.');
        showNotification();

        setIsNewRestaurant(false);
        setErrorContactNumNotFound(false);
        setErrorRestIDNotFound(false);
        setRestaurantID(response.data[0].restaurantid);
        setNewRestaurantStaff({ ...newRestaurantStaff, restaurantID: parseInt(response.data[0].restaurantid) });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error creating restaurant. Please contact administrators for assistance',
        });
      });
  };

  const createFDSManager = async () => {
    FDSManagersApis.createFDSManager(newFDSManager)
      .then((response) => {
        if (response.status !== 201) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error creating FDS manager. Please contact administrators for assistance',
          });
        }
        setNotification('FDS Manager has been created! Please login again.');
        showNotification();

        setRegister(false);
        setHasSelectedUserType(false);
        setNoUserFound(false);
        setContactNum('');
        props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: '' });
        clearNewUsersObjects();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error creating FDS manager. Please contact administrators for assistance',
        });
      });
  };

  const loginButton = async () => {
    const request = {
      contactNum: contactNum,
      userType: props.loggedInUserType,
    };
    AccountsApis.login(request)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: '',
          });
        }
        if (response.data.length === 1) {
          sessionStorage.setItem('userType', props.loggedInUserType);
          props.dispatch({ type: 'SET_LOGGEDIN_USER', data: response.data[0] });
          setRequestOTP(true);
          if (props.loggedInUserType === 'deliveryRider') {
            sessionStorage.setItem('id', response.data[0].riderid);
            sessionStorage.setItem('name', response.data[0].ridername);
            sessionStorage.setItem('contactNum', response.data[0].contactnum);
            sessionStorage.setItem('isFullTime', response.data[0].isfulltime ? 1 : 0);
          } else if (props.loggedInUserType === 'restaurantStaff') {
            sessionStorage.setItem('id', response.data[0].restaurantstaffid);
            sessionStorage.setItem('name', response.data[0].restaurantstaffname);
            sessionStorage.setItem('restaurantID', response.data[0].restaurantid);
            sessionStorage.setItem('contactNum', response.data[0].contactnum);
          } else {
            sessionStorage.setItem('id', response.data[0].managerid);
            sessionStorage.setItem('name', response.data[0].managername);
            sessionStorage.setItem('contactNum', response.data[0].contactnum);
          }
        } else {
          setNoUserFound(true);
          setErrorContactNumNotFound(true);
        }
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: '',
        });
      });
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  const clearNewUsersObjects = () => {
    setNewFDSManager({
      managerName: '',
      contactNum: '',
    });
    setNewRestaurantStaff({
      restaurantStaffName: '',
      contactNum: '',
      restaurantID: '',
    });
    setNewRestaurant({
      restaurantName: '',
      minOrderCost: '',
      contactNum: '',
      address: '',
      postalCode: '',
    });
  };

  const convertToProperCasing = () => {
    if (props.loggedInUserType === 'deliveryRider') {
      return 'delivery rider';
    } else if (props.loggedInUserType === 'restaurantStaff') {
      return 'restaurant staff';
    } else {
      return 'FDS manager';
    }
  };

  //   useEffect(() => {
  //     if (counter === 0) {
  //       setRequestOTP(false);
  //       sessionStorage.setItem('userType', '');
  //       props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: '' });
  //       props.dispatch({ type: 'SET_LOGGEDIN_USER', data: {} });
  //       setHasSelectedUserType(false);
  //       setNoUserFound(false);
  //       setContactNum('');
  //       clearNewUsersObjects();
  //     }
  //     const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //     return () => clearInterval(timer);
  //   }, [counter]);

  return redirectHomepage ? (
    <Redirect to='/' />
  ) : register ? (
    <Grid container className={classes.card}>
      <Grid item xs={12} sm={9} md={6} lg={3}>
        <Card>
          <Grid container className={classes.center}>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <CardMedia component='img' className={classes.media} title='KinKao' image='/KinKao.png' />
            </Grid>
          </Grid>
          <CardContent>
            <Typography variant='h5' component='p' align='center'>
              {isNewRestaurant ? `New restaurant` : `New ${convertToProperCasing()}`}
            </Typography>
            <Typography variant='body1' component='p' align='center'>
              Please enter details below
            </Typography>
            {props.loggedInUserType === 'deliveryRider' && (
              <>
                <FormGroup row className={classes.center}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newRider.isFullTime}
                        onChange={(event) => setNewRider({ ...newRider, [event.target.name]: event.target.checked })}
                        name='isFullTime'
                      />
                    }
                    label='Sign up as full-time rider'
                  />
                </FormGroup>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      id='standard-full-width'
                      name='riderName'
                      fullWidth
                      label='Name'
                      helperText='Proper casing preferred e.g. John Doe'
                      value={newRider.riderName}
                      onChange={(event) => setNewRider({ ...newRider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      id='standard-full-width'
                      name='riderEmail'
                      fullWidth
                      label='Email'
                      helperText='For notification purposes on new orders e.g. johndoe@gmail.com'
                      value={newRider.riderEmail}
                      onChange={(event) => setNewRider({ ...newRider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='contactNum'
                      fullWidth
                      label='Contact Number'
                      multiline
                      disabled
                      value={newRider.contactNum}
                      helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                      onChange={(event) => setNewRider({ ...newRider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            {props.loggedInUserType === 'restaurantStaff' && (
              <>
                <FormGroup row className={classes.center}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isNewRestaurant}
                        onChange={(event) => setIsNewRestaurant(event.target.checked)}
                        name='isNewRestaurant'
                        disabled={restaurantID > -1 ? true : false}
                      />
                    }
                    label='Create new Restaurant'
                  />
                </FormGroup>
                {isNewRestaurant ? (
                  <>
                    <Grid container direction='row' spacing={2} className={classes.input}>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          id='standard-full-width'
                          name='restaurantName'
                          fullWidth
                          label='Restaurant Name'
                          helperText='Proper casing preferred e.g. Papa John'
                          value={newRestaurant.restaurantName}
                          onChange={(event) =>
                            setNewRestaurant({ ...newRestaurant, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          type='number'
                          id='standard-full-width'
                          name='minOrderCost'
                          fullWidth
                          label='Minimum order cost'
                          helperText='Minimum cost of order e.g. 15'
                          value={newRestaurant.minOrderCost}
                          onChange={(event) =>
                            setNewRestaurant({ ...newRestaurant, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          type='number'
                          id='standard-full-width'
                          name='contactNum'
                          fullWidth
                          label='Restaurant Contact Number'
                          multiline
                          value={newRestaurant.contactNum}
                          helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                          onChange={(event) =>
                            setNewRestaurant({ ...newRestaurant, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          id='standard-full-width'
                          name='address'
                          fullWidth
                          label='Restaurant Address'
                          multiline
                          value={newRestaurant.address}
                          helperText='E.g. 123 Clementi Ave 3, #01-23, 321 Clementi'
                          onChange={(event) =>
                            setNewRestaurant({ ...newRestaurant, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          type='number'
                          id='standard-full-width'
                          name='postalCode'
                          fullWidth
                          label='Restaurant Postal Code'
                          multiline
                          value={newRestaurant.postalCode}
                          helperText='E.g. 120321'
                          onChange={(event) =>
                            setNewRestaurant({ ...newRestaurant, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid container direction='row' spacing={2} className={classes.input}>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          type='number'
                          id='standard-full-width'
                          name='restaurantID'
                          fullWidth
                          label='Restaurant ID'
                          disabled={restaurantID > -1 ? true : false}
                          error={errorRestIDNotFound ? true : false}
                          helperText={
                            errorRestIDNotFound
                              ? 'Restaurant ID does not exists'
                              : 'Restaurant unique identification number'
                          }
                          value={newRestaurantStaff.restaurantID}
                          onChange={(event) =>
                            setNewRestaurantStaff({ ...newRestaurantStaff, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          id='standard-full-width'
                          name='restaurantStaffName'
                          fullWidth
                          label='Restaurant Staff Name'
                          multiline
                          helperText='Proper casing preferred e.g. John Doe'
                          value={newRestaurantStaff.restaurantStaffName}
                          onChange={(event) =>
                            setNewRestaurantStaff({ ...newRestaurantStaff, [event.target.name]: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <TextField
                          type='number'
                          id='standard-full-width'
                          name='contactNum'
                          fullWidth
                          label='Contact Number'
                          multiline
                          disabled={true}
                          helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                          value={newRestaurantStaff.contactNum}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            )}
            {props.loggedInUserType === 'fdsManager' && (
              <>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      id='standard-full-width'
                      name='managerName'
                      fullWidth
                      label='Name'
                      multiline
                      helperText='Proper casing preferred i.e. John Doe'
                      value={newFDSManager.managerName}
                      onChange={(event) =>
                        setNewFDSManager({ ...newFDSManager, [event.target.name]: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='contactNum'
                      fullWidth
                      label='Contact Number'
                      multiline
                      disabled={true}
                      helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                      value={newFDSManager.contactNum}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <Grid container direction='column' spacing={2} className={classes.loginButton}>
              <Grid item>
                <Button
                  variant='contained'
                  style={{ backgroundColor: '#ff3008', color: '#fff' }}
                  onClick={() => createNewUser()}
                >
                  {isNewRestaurant ? `Create New Restaurant` : `Create New ${convertToProperCasing()}`}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => {
                    setHasSelectedUserType(false);
                    setNoUserFound(false);
                    setContactNum('');
                    setRegister(false);
                    clearNewUsersObjects();
                    setErrorContactNumNotFound(false);
                    setErrorRestIDNotFound(false);
                  }}
                >
                  Go back to Login
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Snackbar
                place='bc'
                color='info'
                icon={AddAlert}
                message={notification}
                open={bc}
                onClose={() => setBC(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : requestOTP ? (
    <>
      <Grid container className={classes.card}>
        <Grid item xs={12} sm={9} md={6} lg={3}>
          <Card>
            <Grid container className={classes.center}>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <CardMedia component='img' className={classes.media} title='KinKao' image='/KinKao.png' />
              </Grid>
              <CardContent>
                <Typography variant='h5' component='p' align='center'>
                  Admin Managment Portal
                </Typography>
                <Typography variant='body1' component='p' align='center'>
                  An SMS has been sent to your contact number containing the one-time password (OTP)
                </Typography>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='otp'
                      fullWidth
                      label='One-time password'
                      helperText='OTP is a 6 digit code e.g. 000000'
                      value={otp}
                      onChange={(event) => setOTP(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='column' spacing={2} className={classes.loginButton}>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff' }}
                      onClick={() => {
                        setRedirectHomepage(true);
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
                {/* <Typography variant='body1' component='p' align='center' className={classes.counter}>
                  OTP expries in {counter} seconds
                </Typography> */}
                <Grid container direction='column' spacing={2} className={classes.rerequestOTP}>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff' }}
                      onClick={() => {
                        // setCounter(60)
                        setNotification('A new OTP hs been sent to your contact number');
                        showNotification();
                      }}
                    >
                      Request for OTP again
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setRequestOTP(false);
                        setHasSelectedUserType(false);
                        setNoUserFound(false);
                        setContactNum('');
                        clearNewUsersObjects();
                        setErrorContactNumNotFound(false);
                        setErrorRestIDNotFound(false);
                        sessionStorage.clear();
                      }}
                    >
                      Go back to Login
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Snackbar
                place='bc'
                color='info'
                icon={AddAlert}
                message={notification}
                open={bc}
                onClose={() => setBC(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <Grid container className={classes.card}>
      <Grid item xs={12} sm={9} md={6} lg={3}>
        <Card>
          <Grid container className={classes.center}>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <CardMedia component='img' className={classes.media} title='KinKao' image='/KinKao.png' />
            </Grid>
          </Grid>
          <CardContent>
            {!hasSelectedUserType ? (
              <>
                <Typography variant='h5' component='p' align='center'>
                  Admin Managment Portal
                </Typography>
                <Typography variant='body1' component='p' align='center'>
                  A one-stop system for your delivery needs
                </Typography>
                <Grid container direction='column' spacing={2} className={classes.userButton}>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ width: '200px', backgroundColor: '#ff3008', color: '#fff' }}
                      startIcon={<MotorcycleIcon />}
                      onClick={() => {
                        setHasSelectedUserType(true);
                        props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: 'deliveryRider' });
                      }}
                    >
                      Delivery Rider
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ width: '200px', backgroundColor: '#ff3008', color: '#fff' }}
                      startIcon={<RestaurantIcon />}
                      onClick={() => {
                        setHasSelectedUserType(true);
                        props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: 'restaurantStaff' });
                      }}
                    >
                      Restaurant Staff
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ width: '200px' }}
                      startIcon={<AssignmentIndIcon />}
                      onClick={() => {
                        setHasSelectedUserType(true);
                        props.dispatch({ type: 'SET_LOGGEDIN_USERTYPE', data: 'fdsManager' });
                      }}
                    >
                      FDS Manager
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Typography variant='h5' component='p' align='center'>
                  {noUserFound ? 'Contact number not found' : `Welcome back, ${convertToProperCasing()}!`}
                </Typography>
                <Typography variant='body1' component='p' align='center'>
                  {noUserFound ? `Click the button below to sign up` : 'Enter your contact number below'}
                </Typography>
                <Grid container direction='row' className={classes.input}>
                  <Grid item xs={9} sm={9} md={9} lg={9}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      fullWidth
                      label='Contact Number'
                      multiline
                      error={errorContactNumNotFound ? true : false}
                      helperText={
                        errorContactNumNotFound
                          ? 'Contact number not found'
                          : 'Omit plus sign, spaces, and dashes e.g. 84997406'
                      }
                      value={contactNum}
                      onChange={(event) => setContactNum(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='column' spacing={2} className={classes.loginButton}>
                  <Grid item>
                    {noUserFound ? (
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff' }}
                        onClick={() => {
                          setRegister(true);
                          setNewRider({ ...newRider, contactNum: parseInt(contactNum) });
                          setNewFDSManager({ ...newFDSManager, contactNum: parseInt(contactNum) });
                          setNewRestaurantStaff({ ...newRestaurantStaff, contactNum: parseInt(contactNum) });
                        }}
                      >
                        {`Sign up as ${convertToProperCasing()}`}
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff' }}
                        onClick={() => {
                          loginButton();
                          setCounter(60);
                        }}
                      >
                        Request for OTP
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setHasSelectedUserType(false);
                        setNoUserFound(false);
                        setContactNum('');
                        clearNewUsersObjects();
                        setErrorContactNumNotFound(false);
                        setErrorRestIDNotFound(false);
                      }}
                    >
                      Go Back to Login
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Snackbar
                place='bc'
                color='info'
                icon={AddAlert}
                message={notification}
                open={bc}
                onClose={() => setBC(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  loggedInUserType: state.reducer.loggedInUserType,
});
export default connect(mapStateToProps)(Login);
