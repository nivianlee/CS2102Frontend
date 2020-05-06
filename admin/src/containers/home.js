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
}));

const Home = (props) => {
  const classes = useStyles();
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

  useEffect(() => {
    getFDSManagerSummaryOne();
    getFDSManagerSummaryTwo();
    getFDSManagerSummaryThree();
    getFDSManagerSummaryFour();
  }, []);

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

  return (
    sessionStorage.getItem('userType') === 'fdsManager' && (
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
    )
  );
};

const mapStateToProps = (state) => ({
  summaryOne: state.reducer.summaryOne,
});
export default connect(mapStateToProps)(Home);
