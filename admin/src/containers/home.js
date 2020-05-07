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

import MaterialTable from 'material-table';
import * as FDSManagersApis from '../api/fdsManagers';
import * as RidersApi from '../api/riders';
import moment from 'moment';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '0%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  cardMargin: {
    marginTop: '10px',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  // fdsmanagers
  const [dataCustomerOrders, setDataCustomerOrders] = useState([]);
  const [dataTotalOrderSum, setDataTotalOrderSum] = useState([]);
  const [summaryTwo, setSummaryTwo] = useState([]);
  const [summaryThree, setSummaryThree] = useState([]);
  const [summaryFour, setSummaryFour] = useState([]);
  const [tableStateTwo, setTableStateTwo] = useState({
    columns: [
      { title: 'Year', field: 'year' },
      { title: 'Month', field: 'month' },
      { title: 'Customer ID', field: 'customerid' },
      { title: 'Total Orders', field: 'totalnumordersbycust' },
      { title: 'Total Cost', field: 'totalcostbycust' },
    ],
  });
  const [tableStateThree, setTableStateThree] = useState({
    columns: [
      { title: 'Delivery Address', field: 'deliveryaddress' },
      { title: 'Hour', field: 'hour' },
      { title: 'Total No. Orders', field: 'totalnumorders' },
    ],
  });
  const [tableStateFour, setTableStateFour] = useState({
    columns: [
      { title: 'Year', field: 'year' },
      { title: 'Month', field: 'month' },
      { title: 'Rider ID', field: 'riderid' },
      { title: 'Delivery Address', field: 'totalnumberordersdelivered' },
      { title: 'Total Hours Worked', field: 'totalhoursworked' },
      { title: 'Total Salary Earned', field: 'totalsalaryearned' },
      { title: 'Average Delivery Time', field: 'averagedeliverytime' },
      { title: 'No. Ratings', field: 'numratings' },
      { title: 'Average Rating', field: 'averagerating' },
    ],
  });

  // riders
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState(-1);

  useEffect(() => {
    getFDSManagerSummaryOne();
    getFDSManagerSummaryTwo();
    getFDSManagerSummaryThree();
    getFDSManagerSummaryFour();
    getOrdersByRiderId();
  }, []);

  // fdsmanagers
  const getFDSManagerSummaryOne = () => {
    FDSManagersApis.getFDSManagerSummaryOne()
      .then((response) => {
        if (response.status !== 201) {
        }
        let datas = response.data;
        datas.forEach(function (data, index) {
          let data1 = {
            month: data.year + '-' + data.month,
            numcustcreated: data.numcustcreated,
            totalorders: data.totalorders,
          };
          let data2 = {
            month: data.year + '-' + data.month,
            totalorderssum: data.totalorderssum,
          };
          setDataCustomerOrders((dataCustomerOrders) => [...dataCustomerOrders, data1]);
          setDataTotalOrderSum((dataTotalOrderSum) => [...dataTotalOrderSum, data2]);
        });
      })
      .catch((err) => {});
  };

  const getFDSManagerSummaryTwo = () => {
    FDSManagersApis.getFDSManagerSummaryTwo()
      .then((response) => {
        if (response.status !== 201) {
        }
        setSummaryTwo(response.data);
      })
      .catch((err) => {});
  };

  const getFDSManagerSummaryThree = () => {
    FDSManagersApis.getFDSManagerSummaryThree()
      .then((response) => {
        if (response.status !== 201) {
        }
        setSummaryThree(response.data);
      })
      .catch((err) => {});
  };

  const getFDSManagerSummaryFour = () => {
    FDSManagersApis.getFDSManagerSummaryFour()
      .then((response) => {
        if (response.status !== 201) {
        }
        setSummaryFour(response.data);
      })
      .catch((err) => {});
  };

  // riders
  const getOrdersByRiderId = async () => {
    RidersApi.getOrdersByRiderId(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
        }
        setMyOrders(response.data);
      })
      .catch((err) => {});
  };

  const toggleUpdateRiderOrderTimestamp = (orderid) => {
    const data = {
      orderid: orderid,
    };
    RidersApi.toggleUpdateRiderOrderTimestamp(data)
      .then((response) => {
        if (response.status !== 200) {
        }
        setNotification(response.data.message);
        showNotification();
        getOrdersByRiderId();
      })
      .catch((err) => {});
  };

  const toggleButtonString = (order) => {
    if (!order.riderdepartforrestimestamp) {
      return 'Departed for Restaurant';
    } else {
      if (!order.riderarriveatrestimestamp) {
        return 'Arrived at Retaurant';
      } else {
        if (!order.ridercollectordertimestamp) {
          return 'Collected Order';
        } else {
          if (!order.riderdeliverordertimestamp) {
            return 'Delivered Order';
          }
        }
      }
    }
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  return (
    <>
      {sessionStorage.getItem('userType') === 'restaurantStaff' && (
        <Grid container direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardContent>
                <Typography variant='body1' component='p' align='left'>
                  Please use sidebar to navigate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {sessionStorage.getItem('userType') === 'deliveryRider' && (
        <>
          <Grid container direction='row'>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='p' align='left'>
                    Current Orders
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container direction='row' className={classes.card} style={{ marginTop: '10px' }} spacing={2}>
            {myOrders.map((order) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={order.orderid}>
                <Card>
                  <CardContent>
                    <Grid container direction='column'>
                      <Grid item>
                        <Typography variant='overline' display='block' align='right'>
                          Delivery ID: {order.deliveryid}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='h6' component='p' align='left'>
                          Order ID: {order.orderid}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          Delivery Address: {order.deliveryaddress}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          Special Request: {order.specialrequest ? order.specialrequest : 'NIL'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin} style={{ marginBottom: '10px' }}>
                        <Typography variant='body2' component='p' align='left'>
                          Order Completed: {order.status ? 'Yes' : 'No'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='overline' display='block' align='left'>
                          Order Placed At
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          {order.orderplacedtimestamp
                            ? moment(order.orderplacedtimestamp).format('MMMM Do YYYY, h:mm:ss a')
                            : 'NIL'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='overline' display='block' align='left'>
                          Rider Depart for Restaurant
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          {order.riderdepartforrestimestamp
                            ? moment(order.riderdepartforrestimestamp).format('MMMM Do YYYY, h:mm:ss a')
                            : 'NIL'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='overline' display='block' align='left'>
                          Rider Arrive At Restaurant
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          {order.riderarriveatrestimestamp
                            ? moment(order.riderarriveatrestimestamp).format('MMMM Do YYYY, h:mm:ss a')
                            : 'NIL'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='overline' display='block' align='left'>
                          Rider Collect Order
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='body2' component='p' align='left'>
                          {order.ridercollectordertimestamp
                            ? moment(order.ridercollectordertimestamp).format('MMMM Do YYYY, h:mm:ss a')
                            : 'NIL'}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin}>
                        <Typography variant='overline' display='block' align='left'>
                          Rider Deliver Order
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardMargin} style={{ marginBottom: '20px' }}>
                        <Typography variant='body2' component='p' align='left'>
                          {order.riderdeliverordertimestamp
                            ? moment(order.riderdeliverordertimestamp).format('MMMM Do YYYY, h:mm:ss a')
                            : 'NIL'}
                        </Typography>
                      </Grid>
                      {!order.status && (
                        <Grid item>
                          <Button
                            variant='contained'
                            style={{ backgroundColor: '#ff3008', color: '#fff' }}
                            onClick={() => {
                              toggleUpdateRiderOrderTimestamp(order.orderid);
                            }}
                          >
                            {toggleButtonString(order)}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container justify={'center'}>
            <Grid item xs={12} sm={12} md={10} lg={8}>
              <Grid container>
                <Grid item xs={12} sm={12} md={4}>
                  <Snackbar place='bc' color='info' message={notification} open={bc} onClose={() => setBC(false)} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {sessionStorage.getItem('userType') === 'fdsManager' && (
        <Grid container direction='row' className={classes.card} spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardContent align='center'>
                <>
                  <Typography variant='overline' display='block' component='p' align='center'>
                    Number of new customers and orders per month
                  </Typography>
                  <LineChart
                    width={500}
                    height={280}
                    data={dataCustomerOrders}
                    margin={{
                      top: 10,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis domain={[6, 30]} />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='numcustcreated' stroke='#8884d8' activeDot={{ r: 8 }} />
                    <Line type='monotone' dataKey='totalorders' stroke='#82ca9d' />
                  </LineChart>
                </>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardContent align='center'>
                <>
                  <Typography variant='overline' display='block' component='p' align='center'>
                    Total order sum per month
                  </Typography>
                  <LineChart
                    width={500}
                    height={280}
                    data={dataTotalOrderSum}
                    margin={{
                      top: 10,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis domain={[300, 1500]} />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='totalorderssum' stroke='#8884d8' activeDot={{ r: 8 }} />
                  </LineChart>
                </>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <MaterialTable
                title='No. of Orders and Total Cost by Customers'
                columns={tableStateTwo.columns}
                data={summaryTwo}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <MaterialTable
                title='No. of Orders sent to an Address at an hour'
                columns={tableStateThree.columns}
                data={summaryThree}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <MaterialTable title='Riders Statistical Data' columns={tableStateFour.columns} data={summaryFour} />
            </Card>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <>
                <Typography variant='overline' display='block' component='p' align='center'>
                  Total order sum per month
                </Typography>
                <BarChart
                  width={500}
                  height={280}
                  data={summaryTwo}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='customerid' />
                  <YAxis domain={[0, 200]} />
                  <Tooltip />
                  <Legend />
                  <Bar type='monotone' dataKey='totalcostbycust' stroke='#8884d8' activeDot={{ r: 8 }} />
                </BarChart>
              </>
            </CardContent>
          </Card>
        </Grid> */}
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  summaryOne: state.reducer.summaryOne,
});
export default connect(mapStateToProps)(Home);
