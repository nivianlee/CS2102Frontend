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
import MaterialTable from 'material-table';
import * as MWSApis from '../api/mws';
import * as RidersApi from '../api/riders';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '0%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  title: {
    marginTop: '1%',
    marginBottom: '2%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  title2: {
    marginBottom: '1%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  foodItemText: {
    margin: '4%',
  },
  foodItemTextInput: {
    marginBottom: '2%',
  },
  foodItemButton: {
    marginLeft: '4%',
    marginBottom: '5%',
  },
  button: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Riders = (props) => {
  const classes = useStyles();
  const [tableStateMWS, setTableStateMWS] = useState({
    columns: [
      { title: 'Rider ID', field: 'riderid' },
      { title: 'Shift ID', field: 'shiftid' },
      { title: 'Month', field: 'month' },
      {
        title: 'Range',
        render: (rowData) => <Typography variant='body2'>{convertRangeToString(rowData.rangeid)}</Typography>,
      },
      {
        title: 'Shift 1',
        render: (rowData) => (
          <Typography variant='body2'>
            {rowData.shiftonestart} - {rowData.shiftoneend}
          </Typography>
        ),
      },
      {
        title: 'Shift 2',
        render: (rowData) => (
          <Typography variant='body2'>
            {rowData.shifttwostart} - {rowData.shifttwoend}
          </Typography>
        ),
      },
    ],
  });
  const [tableStateWWS, setTableStateWWS] = useState({
    columns: [
      { title: 'Rider ID', field: 'riderid' },
      { title: 'Week', field: 'week' },
      { title: 'Day', field: 'day' },
      {
        title: 'Time',
        render: (rowData) => (
          <Typography variant='body2'>
            {rowData.starttime} - {rowData.endtime}
          </Typography>
        ),
      },
    ],
  });
  const [ridersSummary, setRidersSummary] = useState([]);
  const [tableStateRidersSummary, setTableStateRidersSummary] = useState({
    columns: [
      { title: 'Rider ID', field: 'riderid' },
      { title: 'Month', field: 'month' },
      { title: 'Hours Worked', field: 'hoursworked' },
      { title: 'Orders Per Month', field: 'orderspermonth' },
      { title: 'Total Salary Earned', field: 'totalsalaryearned' },
    ],
  });

  useEffect(() => {
    getShiftsTable();
    getMwsFullTimeRiders();
    getWwsPartTimeRiders();
    getAllRidersSummary();
  }, []);

  const getAllRidersSummary = async () => {
    RidersApi.getAllRidersSummary()
      .then((response) => {
        if (response.status !== 200) {
        }
        setRidersSummary(response.data);
      })
      .catch((err) => {});
  };

  const getShiftsTable = async () => {
    MWSApis.getShiftsTable()
      .then((response) => {
        if (response.status !== 200) {
        }
        props.dispatch({ type: 'SET_SHIFTS_TABLE', data: response.data });
      })
      .catch((err) => {});
  };

  const getMwsFullTimeRiders = async () => {
    MWSApis.getMwsFullTimeRiders()
      .then((response) => {
        if (response.status !== 200) {
        }
        props.dispatch({ type: 'SET_FULLTIME_RIDERS', data: response.data });
      })
      .catch((err) => {});
  };

  const getWwsPartTimeRiders = async () => {
    MWSApis.getWwsPartTimeRiders()
      .then((response) => {
        if (response.status !== 200) {
        }
        props.dispatch({ type: 'SET_PARTTIME_RIDERS', data: response.data });
      })
      .catch((err) => {});
  };

  const convertRangeToString = (rangeID) => {
    if (rangeID === 1) {
      return 'Mon | Tue | Wed | Thu | Fri';
    }
    if (rangeID === 2) {
      return 'Tue | Wed | Thu | Fri | Sat';
    }
    if (rangeID === 3) {
      return 'Wed | Thu | Fri | Sat | Sun';
    }
    if (rangeID === 4) {
      return 'Thu | Fri | Sat | Sun | Mon';
    }
    if (rangeID === 5) {
      return 'Fri | Sat | Sun | Mon | Tue';
    }
    if (rangeID === 6) {
      return 'Sat | Sun | Mon | Tue | Wed';
    }
    if (rangeID === 7) {
      return 'Sun | Mon | Tue | Wed | Thu';
    }
  };

  return (
    <Grid container direction='row' className={classes.card} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Card>
                  <MaterialTable title='Summary' columns={tableStateRidersSummary.columns} data={ridersSummary} />
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <MaterialTable title='Full Time Riders' columns={tableStateMWS.columns} data={props.fullTimeRiders} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <MaterialTable title='Part Time Riders' columns={tableStateWWS.columns} data={props.partTimeRiders} />
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  shiftsTable: state.reducer.shiftsTable,
  fullTimeRiders: state.reducer.fullTimeRiders,
  partTimeRiders: state.reducer.partTimeRiders,
});

export default connect(mapStateToProps)(Riders);
