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
import AddAlert from '@material-ui/icons/AddAlert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialTable from 'material-table';

import * as FDSManagersApis from '../api/fdsManagers';
import * as RestaurantStaffApis from '../api/restaurantstaff';
import * as RestaurantsApis from '../api/restaurants';
import * as RidersApis from '../api/riders';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '0%',
  },
  title: {
    marginTop: '2%',
    marginDown: '2%',
  },
  input: {
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    width: '200px',
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [rider, setRider] = useState({
    riderID: -1,
    riderName: '',
    riderEmail: '',
    contactNum: '',
    isOccupied: false,
    isFullTime: false,
    baseSalary: 0,
  });
  const [fdsManager, setFDSManager] = useState({
    managerID: -1,
    managerName: '',
    contactNum: '',
  });
  const [restaurantStaff, setRestaurantStaff] = useState({
    restaurantStaffID: -1,
    restaurantStaffName: '',
    contactNum: '',
    restaurantID: -1,
  });
  const [restaurant, setRestaurant] = useState({
    restaurantID: -1,
    restaurantName: '',
    minOrderCost: '',
    contactNum: '',
    address: '',
    postalCode: '',
  });
  const [riderSummary, setRiderSummary] = useState([]);
  const [tableStateRiderSummary, setTableStateRiderSummary] = useState({
    columns: [
      { title: 'Month', field: 'month' },
      { title: 'Hours Worked', field: 'hoursworked' },
      { title: 'Orders Per Month', field: 'orderspermonth' },
      { title: 'Total Salary Earned', field: 'totalsalaryearned' },
    ],
  });

  useEffect(() => {
    if (sessionStorage.getItem('userType') === 'deliveryRider') {
      getRiderById();
      getRiderSummaryById();
    } else if (sessionStorage.getItem('userType') === 'restaurantStaff') {
      getRestaurantStaffById();
      getRestaurantById();
    } else {
      getFDSManagerById();
    }
  }, []);

  const getRiderSummaryById = async () => {
    RidersApis.getRiderSummaryById(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
        }
        setRiderSummary(response.data);
      })
      .catch((err) => {});
  };

  const getRiderById = async () => {
    RidersApis.getRiderById(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving rider. Please contact administrators for assistance',
          });
        }
        setRider({
          ...rider,
          riderID: response.data[0].riderid,
          riderName: response.data[0].ridername,
          riderEmail: response.data[0].rideremail,
          contactNum: response.data[0].contactnum,
          isOccupied: response.data[0].isoccupied,
          isFullTime: response.data[0].isfulltime,
          baseSalary: response.data[0].basesalary,
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving rider. Please contact administrators for assistance',
        });
      });
  };

  const getRestaurantStaffById = async () => {
    RestaurantStaffApis.getRestaurantStaffById(sessionStorage.getItem('restaurantID'), sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurant staff. Please contact administrators for assistance',
          });
        }
        setRestaurantStaff({
          ...restaurantStaff,
          restaurantStaffID: response.data[0].restaurantstaffid,
          restaurantStaffName: response.data[0].restaurantstaffname,
          contactNum: response.data[0].contactnum,
          restaurantID: response.data[0].restaurantid,
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving FDS manager. Please contact administrators for assistance',
        });
      });
  };

  const getRestaurantById = async () => {
    RestaurantsApis.getRestaurantById(sessionStorage.getItem('restaurantID'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurant. Please contact administrators for assistance',
          });
        }
        setRestaurant({
          ...restaurant,
          restaurantID: response.data[0].restaurantid,
          restaurantName: response.data[0].restaurantname,
          minOrderCost: response.data[0].minordercost,
          contactNum: response.data[0].contactnum,
          address: response.data[0].address,
          postalCode: response.data[0].postalcode,
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving restaurants. Please contact administrators for assistance',
        });
      });
  };

  const getFDSManagerById = async () => {
    FDSManagersApis.getFDSManagerById(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving FDS manager. Please contact administrators for assistance',
          });
        }
        setFDSManager({
          ...fdsManager,
          managerID: response.data[0].managerid,
          managerName: response.data[0].managername,
          contactNum: response.data[0].contactnum,
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving FDS managers. Please contact administrators for assistance',
        });
      });
  };

  const updateRider = async () => {
    RidersApis.updateRider(rider, rider.riderID)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating rider. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();

        getRiderById();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating rider. Please contact administrators for assistance',
        });
      });
  };

  const updateRestaurantStaff = async () => {
    RestaurantStaffApis.updateRestaurantStaff(restaurantStaff, restaurantStaff.restaurantStaffID)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating restaurant staff. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();

        getRestaurantStaffById();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating restaurant staff. Please contact administrators for assistance',
        });
      });
  };

  const updateRestaurant = async () => {
    RestaurantsApis.updateRestaurant(restaurant, restaurant.restaurantID)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating restaurant. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();

        getRestaurantById();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating restaurant. Please contact administrators for assistance',
        });
      });
  };

  const updateFDSManager = async () => {
    FDSManagersApis.updateFDSManager(fdsManager, fdsManager.managerID)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating FDS manager. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();

        getFDSManagerById();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating FDS manager. Please contact administrators for assistance',
        });
      });
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  return (
    <Grid container direction='row' className={classes.card} spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Card>
          <CardContent>
            {sessionStorage.getItem('userType') === 'deliveryRider' && (
              <>
                <Typography variant='h5' component='p' align='left'>
                  My Profile
                </Typography>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id='standard-full-width'
                      name='riderID'
                      fullWidth
                      label='Rider ID'
                      disabled={true}
                      value={rider.riderID}
                      onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id='standard-full-width'
                      name='riderName'
                      fullWidth
                      label='Name'
                      helperText='Proper casing preferred e.g. John Doe'
                      value={rider.riderName}
                      onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id='standard-full-width'
                      name='riderEmail'
                      fullWidth
                      label='Email'
                      helperText='For notification purposes on new orders e.g. johndoe@gmail.com'
                      value={rider.riderEmail}
                      onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='contactNum'
                      fullWidth
                      label='Contact Number'
                      value={rider.contactNum}
                      helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                      onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='demo-simple-select-label'>Employment Status</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={rider.isFullTime}
                        name='isFullTime'
                        disabled={true}
                        onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                      >
                        <MenuItem value={true}>Full Time</MenuItem>
                        <MenuItem value={false}>Part Time</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='baseSalary'
                      fullWidth
                      label='Base Salary'
                      value={rider.baseSalary}
                      disabled={true}
                      helperText='$ per month'
                      onChange={(event) => setRider({ ...rider, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid container direction='column' spacing={2} className={classes.button}>
                    <Grid item>
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff' }}
                        onClick={() => {
                          updateRider();
                        }}
                      >
                        Update Profile
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        onClick={() => {
                          getRiderById();
                          setNotification('Profile was not updated, retrieving original profile');
                          showNotification();
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {sessionStorage.getItem('userType') === 'restaurantStaff' && (
              <>
                <Typography variant='h5' component='p' align='left'>
                  My Profile
                </Typography>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='restaurantStaffID'
                      fullWidth
                      label='Restaurant Staff ID'
                      disabled={true}
                      value={restaurantStaff.restaurantStaffID}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id='standard-full-width'
                      name='restaurantStaffName'
                      fullWidth
                      label='Restaurant Staff Name'
                      multiline
                      helperText='Proper casing preferred e.g. John Doe'
                      value={restaurantStaff.restaurantStaffName}
                      onChange={(event) =>
                        setRestaurantStaff({ ...restaurantStaff, [event.target.name]: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='contactNum'
                      fullWidth
                      label='Contact Number'
                      helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                      value={restaurantStaff.contactNum}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='column' spacing={2} className={classes.button}>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff' }}
                      onClick={() => {
                        updateRestaurantStaff();
                      }}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={() => {
                        getRestaurantStaffById();
                        setNotification('Profile was not updated, retrieving original profile');
                        showNotification();
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            {sessionStorage.getItem('userType') === 'fdsManager' && (
              <>
                <Typography variant='h5' component='p' align='left' className={classes.title}>
                  My Profile
                </Typography>
                <Grid container direction='row' spacing={2} className={classes.input}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      disabled={true}
                      id='standard-full-width'
                      name='managerID'
                      fullWidth
                      label='Manager ID'
                      multiline
                      value={fdsManager.managerID}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id='standard-full-width'
                      name='managerName'
                      fullWidth
                      label='Name'
                      multiline
                      helperText='Proper casing preferred e.g. John Doe'
                      value={fdsManager.managerName}
                      onChange={(event) => setFDSManager({ ...fdsManager, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      type='number'
                      id='standard-full-width'
                      name='contactNum'
                      fullWidth
                      label='Contact Number'
                      helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                      value={fdsManager.contactNum}
                      onChange={(event) => setFDSManager({ ...fdsManager, [event.target.name]: event.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='column' spacing={2} className={classes.button}>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff' }}
                      onClick={() => {
                        updateFDSManager();
                      }}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={() => {
                        getFDSManagerById();
                        setNotification('Profile was not updated, retrieving original profile');
                        showNotification();
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      {sessionStorage.getItem('userType') === 'deliveryRider' && (
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <Card>
            <CardContent>
              <Grid container direction='row' spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Card>
                    <MaterialTable title='Summary' columns={tableStateRiderSummary.columns} data={riderSummary} />
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      {sessionStorage.getItem('userType') === 'restaurantStaff' && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='p' align='left'>
                My Restaurant
              </Typography>
              <Grid container direction='row' spacing={2} className={classes.input}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id='standard-full-width'
                    name='restaurantID'
                    fullWidth
                    label='Restaurant ID'
                    disabled={true}
                    value={restaurant.restaurantID}
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id='standard-full-width'
                    name='restaurantName'
                    fullWidth
                    label='Restaurant Name'
                    helperText='Proper casing preferred e.g. Papa John'
                    value={restaurant.restaurantName}
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    type='number'
                    id='standard-full-width'
                    name='minOrderCost'
                    fullWidth
                    label='Minimum order cost'
                    helperText='Minimum cost of order e.g. 15'
                    value={restaurant.minOrderCost}
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    type='number'
                    id='standard-full-width'
                    name='contactNum'
                    fullWidth
                    label='Restaurant Contact Number'
                    multiline
                    value={restaurant.contactNum}
                    helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id='standard-full-width'
                    name='address'
                    fullWidth
                    label='Restaurant Address'
                    multiline
                    value={restaurant.address}
                    helperText='E.g. 123 Clementi Ave 3, #01-23, 321 Clementi'
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    type='number'
                    id='standard-full-width'
                    name='postalCode'
                    fullWidth
                    label='Restaurant Postal Code'
                    multiline
                    value={restaurant.postalCode}
                    helperText='E.g. 120321'
                    onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid container direction='column' spacing={2} className={classes.button}>
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#ff3008', color: '#fff' }}
                    onClick={() => {
                      updateRestaurant();
                    }}
                  >
                    Update Restaurant
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    onClick={() => {
                      getRestaurantById();
                      setNotification('Restaurant details was not updated, retrieving original restaurant details');
                      showNotification();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Snackbar
                place='bc'
                color='info'
                icon={<AddAlert />}
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
export default connect(mapStateToProps)(Profile);
