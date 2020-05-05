import React, { useState, useEffect } from 'react';
import '../App.css';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AddAlert from '@material-ui/icons/AddAlert';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as RestaurantsApis from '../api/restaurants';
import Sidebar from '../components/sidebar';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as RestaurantStaffApis from '../api/restaurantstaff';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 240,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  formControl: {
    width: '120px',
  },
  button: {
    marginTop: '8px',
    marginRight: '8px',
  },
  selectYearMonth: {
    marginRight: '8px',
  },
  cardMargin: {
    marginTop: '10px',
  },
}));

const ordersTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        // padding: "0px 0px 0px 24px"
      },
    },
  },
});

const Orders = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [tableStateAll, setTableStateAll] = useState({
    columns: [
      { title: 'Order Id', field: 'orderid' },
      {
        title: 'Order Placed',
        render: (rowData) => (
          <>
            <Tooltip title='YYYY-MM-DD' placement='bottom-start'>
              <Typography variant='body2'>{rowData.orderplacedtimestamp.substring(0, 10)}</Typography>
            </Tooltip>
          </>
        ),
      },
      { title: 'Food Item ID', field: 'fooditemid' },
      { title: 'Price ($)', field: 'price' },
      { title: 'Qty', field: 'quantity' },
    ],
  });
  const [tableStateSelected, setTableStateSelected] = useState({
    columns: [
      { title: 'Order Id', field: 'orderid' },
      {
        title: 'Order Placed',
        render: (rowData) => (
          <>
            <Tooltip title='YYYY-MM-DD' placement='bottom-start'>
              <Typography variant='body2'>{rowData.orderplacedtimestamp.substring(0, 10)}</Typography>
            </Tooltip>
          </>
        ),
      },
      { title: 'Food Item ID', field: 'fooditemid' },
      { title: 'Cost ($)', field: 'cost' },
    ],
  });
  const [uniqueYearMonth, setUniqueYearMonth] = useState([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState('');
  const [hasSelectedYearMonth, setHasSelectedYearMonth] = useState(false);
  const [totalMonthlyCompletedOrders, setTotalMonthlyCompletedOrders] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [foodItemName, setFoodItemName] = useState('');
  const [numOfOrders, setNumOfOrders] = useState('');

  useEffect(() => {
    getAllCompletedOrders();
  }, []);

  const getAllCompletedOrders = async () => {
    RestaurantStaffApis.getAllCompletedOrders(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving orders. Please contact administrators for assistance',
          });
        }
        props.dispatch({ type: 'SET_COMPLETED_ORDERS', data: response.data });

        let orders = response.data;
        orders.forEach(function (order, index) {
          let yearMonth = order.orderplacedtimestamp.substring(0, 7);
          if (uniqueYearMonth.indexOf(yearMonth) === -1) {
            setUniqueYearMonth((uniqueYearMonth) => [...uniqueYearMonth, yearMonth]);
          }
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving orders. Please contact administrators for assistance',
        });
      });
  };

  const getMonthlyCompletedOrders = async () => {
    let year = selectedYearMonth.substring(0, 4);
    let month = selectedYearMonth.substring(5, 7);
    RestaurantStaffApis.getMonthlyCompletedOrders(year, month, sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving orders. Please contact administrators for assistance',
          });
        }
        props.dispatch({ type: 'SET_COMPLETED_ORDERS', data: response.data });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving orders. Please contact administrators for assistance',
        });
      });
  };

  const getMonthlyCompletedOrdersStatistics = async () => {
    let year = selectedYearMonth.substring(0, 4);
    let month = selectedYearMonth.substring(5, 7);
    RestaurantStaffApis.getMonthlyCompletedOrdersStatistics(year, month, sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving orders. Please contact administrators for assistance',
          });
        }
        setTotalMonthlyCompletedOrders(response.data[0].totalmonthlycompletedorders);
        setTotalCost(response.data[0].totalcost);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving orders. Please contact administrators for assistance',
        });
      });
  };

  const getMonthlyFavouriteFoodItems = async () => {
    let year = selectedYearMonth.substring(0, 4);
    let month = selectedYearMonth.substring(5, 7);
    RestaurantStaffApis.getMonthlyFavouriteFoodItems(year, month, sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving orders. Please contact administrators for assistance',
          });
        }
        setFoodItemName(response.data[0].fooditemname);
        setNumOfOrders(response.data[0].numoforders);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving orders. Please contact administrators for assistance',
        });
      });
  };

  return (
    <ThemeProvider theme={ordersTheme}>
      <Grid container direction='column'>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <Grid container direction='row'>
                  <Grid item className={classes.selectYearMonth}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='demo-simple-select-label'>Year-Month</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={selectedYearMonth}
                        onChange={(event) => {
                          setSelectedYearMonth(event.target.value);
                        }}
                      >
                        {uniqueYearMonth.map((yearMonth, index) => (
                          <MenuItem key={index} value={yearMonth}>
                            {yearMonth}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.button}>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff' }}
                      onClick={() => {
                        getMonthlyCompletedOrders();
                        getMonthlyCompletedOrdersStatistics();
                        getMonthlyFavouriteFoodItems();
                        setHasSelectedYearMonth(true);
                      }}
                    >
                      Get Orders
                    </Button>
                  </Grid>
                  <Grid item className={classes.button}>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setSelectedYearMonth('');
                        getAllCompletedOrders();
                        setHasSelectedYearMonth(false);
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {hasSelectedYearMonth && (
            <Grid item xs={12} sm={12} md={2}>
              <Card style={{ padding: '13px' }}>
                <Grid container direction='column'>
                  <Typography variant='overline' display='block'>
                    Earnings
                  </Typography>
                  <Typography variant='h5' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {totalCost}
                  </Typography>
                </Grid>
              </Card>
            </Grid>
          )}
          {hasSelectedYearMonth && (
            <Grid item xs={12} sm={12} md={2}>
              <Card style={{ padding: '13px' }}>
                <Grid container direction='column'>
                  <Typography variant='overline' display='block'>
                    Completed Orders
                  </Typography>
                  <Typography variant='h5' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {totalMonthlyCompletedOrders}
                  </Typography>
                </Grid>
              </Card>
            </Grid>
          )}
          {hasSelectedYearMonth && (
            <Grid item xs={12} sm={12} md={4}>
              <Card style={{ padding: '13px' }}>
                <Grid container direction='column'>
                  <Typography variant='overline' display='block'>
                    Top Food Item, No. Orders
                  </Typography>
                  <Typography variant='h5' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {foodItemName}, {numOfOrders}
                  </Typography>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
        <Grid container direction='row' spacing={2} className={classes.cardMargin}>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <MaterialTable
                title='Completed Orders'
                columns={hasSelectedYearMonth ? tableStateSelected.columns : tableStateAll.columns}
                data={props.completedOrders}
              />
            </Card>
          </Grid>
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
                closeNotification={() => setBC(false)}
                close
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  completedOrders: state.reducer.completedOrders,
});
export default connect(mapStateToProps)(Orders);
