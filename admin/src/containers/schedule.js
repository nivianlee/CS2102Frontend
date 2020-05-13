import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import AddAlert from '@material-ui/icons/AddAlert';

import * as MWSApis from '../api/mws';
import * as RidersApis from '../api/riders';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '0%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  title: {
    alignItems: 'left',
    justifyContent: 'left',
  },
  title2: {
    marginBottom: '1%',
    alignItems: 'left',
    justifyContent: 'left',
  },
  scheduleText: {
    margin: '4%',
  },
  scheduleTextInput: {
    marginBottom: '2%',
  },
  scheduleButton: {
    marginLeft: '4%',
    marginBottom: '5%',
  },
  button: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Schedule = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [isNewSchedule, setIsNewSchedule] = useState(false);
  const [newMWS, setNewMWS] = useState({
    rangeid: -1,
    shiftid: -1,
    riderid: -1,
    month: -1,
    shiftonestart: '',
    shiftoneend: '',
    shifttwostart: '',
    shifttwoend: '',
    range: [],
  });
  const [mws, setMWS] = useState([]);
  const [temp, setTemp] = useState([]);
  const [currMWS, setCurrMWS] = useState({
    rangeid: -1,
    shiftid: -1,
    riderid: -1,
    month: -1,
    shiftonestart: '',
    shiftoneend: '',
    shifttwostart: '',
    shifttwoend: '',
    range: [],
  });
  const [currMonth, setCurrMonth] = useState(-1);
  const [wws, setWWS] = useState([]);
  const [tableStateWWS, setTableStateWWS] = useState({
    columns: [
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

  useEffect(() => {
    if (sessionStorage.getItem('isFullTime') === true) {
      getMwsFullTimeRiderById();
    } else {
      getWwsPartTimeRiderById();
    }
  }, []);

  const getMwsFullTimeRiderById = async () => {
    MWSApis.getMwsFullTimeRiderById(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
        }
        setMWS(response.data);
        // setMWS({
        //   ...mws,
        //   rangeid: data.rangeid,
        //   shiftid: data.shiftid,
        //   riderid: data.riderid,
        //   month: data.month,
        //   shiftonestart: data.shiftonestart,
        //   shiftoneend: data.shiftoneend,
        //   shifttwostart: data.shifttwostart,
        //   shifttwoend: data.shifttwoend,
        //   range: data.range,
        // });
      })
      .catch((err) => {});
  };

  const getWwsPartTimeRiderById = async () => {
    MWSApis.getWwsPartTimeRiderById(sessionStorage.getItem('id'))
      .then((response) => {
        if (response.status !== 200) {
        }
        setWWS(response.data);
      })
      .catch((err) => {});
  };

  const createMwsFullTimeRider = async () => {
    const data = {
      riderid: sessionStorage.getItem('id'),
      shiftid: newMWS.shiftid,
      rangeid: newMWS.rangeid,
      month: 5,
    };
    MWSApis.createMwsFullTimeRider(data)
      .then((response) => {
        if (response.status !== 200) {
        }
        getMwsFullTimeRiderById();
        setNotification('New MWS submitted successfully!');
        showNotification();
        setIsNewSchedule(false);
      })
      .catch((err) => {});
  };

  const updateMwsFullTimeRider = async (month) => {
    const data = {
      riderid: sessionStorage.getItem('id'),
      shiftid: currMWS.shiftid,
      rangeid: currMWS.rangeid,
      month: month,
    };
    MWSApis.updateMwsFullTimeRider(data)
      .then((response) => {
        if (response.status !== 200) {
        }
        setCurrMonth(-1);
        getMwsFullTimeRiderById();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {});
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  const convertMonthToString = (month) => {
    if (month === 1) {
      return 'January';
    }
    if (month === 2) {
      return 'February';
    }
    if (month === 3) {
      return 'March';
    }
    if (month === 4) {
      return 'April';
    }
    if (month === 5) {
      return 'May';
    }
    if (month === 6) {
      return 'June';
    }
    if (month === 7) {
      return 'July';
    }
    if (month === 8) {
      return 'August';
    }
    if (month === 9) {
      return 'September';
    }
    if (month === 10) {
      return 'October';
    }
    if (month === 11) {
      return 'November';
    }
    if (month === 12) {
      return 'December';
    }
  };

  const convertRangeToArray = (rangeID) => {
    if (rangeID === 1) {
      return [1, 2, 3, 4, 5];
    }
    if (rangeID === 2) {
      return [2, 3, 4, 5, 6];
    }
    if (rangeID === 3) {
      return [3, 4, 5, 6, 7];
    }
    if (rangeID === 4) {
      return [4, 5, 6, 7, 1];
    }
    if (rangeID === 5) {
      return [5, 6, 7, 1, 2];
    }
    if (rangeID === 6) {
      return [6, 7, 1, 2, 3];
    }
    if (rangeID === 7) {
      return [7, 1, 2, 3, 4];
    }
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
    <Grid container direction='row' className={classes.card}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Grid
              container
              direction='row'
              className={classes.card}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              {isNewSchedule ? (
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#ff3008', color: '#fff', marginRight: '5px' }}
                    onClick={() => {
                      createMwsFullTimeRider();
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => {
                      setIsNewSchedule(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#ff3008', color: '#fff' }}
                    onClick={() => {
                      setIsNewSchedule(true);
                    }}
                  >
                    Add new Schedule
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {isNewSchedule && (
        <Grid item xs={12} sm={12} md={4} lg={4} style={{ marginTop: '10px', marginRight: '10px' }}>
          <Card>
            <CardContent>
              <Typography variant='h6' component='p' align='left' className={classes.scheduleTextInput}>
                Month: {convertMonthToString(5)}
              </Typography>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.scheduleTextInput}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Shift</FormLabel>
                  <RadioGroup
                    aria-label='shift'
                    name='shiftid'
                    value={newMWS.shiftid}
                    onChange={(event) => setNewMWS({ ...newMWS, [event.target.name]: parseInt(event.target.value) })}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label='1 | Shift 1: 10:00 - 14:00 | Shift 2: 15:00 - 19:00'
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label='2 | Shift 1: 11:00 - 15:00 | Shift 2: 16:00 - 20:00'
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label='3 | Shift 1: 12:00 - 16:00 | Shift 2: 17:00 - 21:00'
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label='4 | Shift 1: 13:00 - 17:00 | Shift 2: 18:00 - 22:00'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.scheduleTextInput}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Range</FormLabel>
                  <RadioGroup
                    aria-label='range'
                    name='rangeid'
                    value={newMWS.rangeid}
                    onChange={(event) => setNewMWS({ ...newMWS, [event.target.name]: parseInt(event.target.value) })}
                  >
                    <FormControlLabel value={1} control={<Radio />} label='1 | Mon | Tue | Wed | Thu | Fri' />
                    <FormControlLabel value={2} control={<Radio />} label='2 | Tue | Wed | Thu | Fri | Sat' />
                    <FormControlLabel value={3} control={<Radio />} label='3 | Wed | Thu | Fri | Sat | Sun' />
                    <FormControlLabel value={4} control={<Radio />} label='4 | Thu | Fri | Sat | Sun | Mon' />
                    <FormControlLabel value={5} control={<Radio />} label='5 | Fri | Sat | Sun | Mon | Tue' />
                    <FormControlLabel value={6} control={<Radio />} label='6 | Sat | Sun | Mon | Tue | Wed' />
                    <FormControlLabel value={7} control={<Radio />} label='7 | Sun | Mon | Tue | Wed | Thu' />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      {sessionStorage.getItem('isFullTime') === true ? (
        <>
          {mws.map((eachMWS) => (
            <Grid item xs={12} sm={12} md={4} lg={4} key={eachMWS.month} style={{ marginTop: '10px' }}>
              <Card>
                <CardContent>
                  <Typography variant='h6' component='p' align='left' className={classes.scheduleTextInput}>
                    Month: {convertMonthToString(eachMWS.month)}
                  </Typography>
                  <Grid item xs={12} sm={12} md={12} lg={12} className={classes.scheduleTextInput}>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Shift</FormLabel>
                      <RadioGroup
                        aria-label='shift'
                        name='shiftid'
                        value={eachMWS.shiftid}
                        onChange={(event) =>
                          setCurrMWS({ ...currMWS, [event.target.name]: parseInt(event.target.value) })
                        }
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label='1 | Shift 1: 10:00 - 14:00 | Shift 2: 15:00 - 19:00'
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label='2 | Shift 1: 11:00 - 15:00 | Shift 2: 16:00 - 20:00'
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio />}
                          label='3 | Shift 1: 12:00 - 16:00 | Shift 2: 17:00 - 21:00'
                        />
                        <FormControlLabel
                          value={4}
                          control={<Radio />}
                          label='4 | Shift 1: 13:00 - 17:00 | Shift 2: 18:00 - 22:00'
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} className={classes.scheduleTextInput}>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Range</FormLabel>
                      <RadioGroup
                        aria-label='range'
                        name='rangeid'
                        value={eachMWS.rangeid}
                        onChange={(event) => setCurrMWS({ ...currMWS, rangeid: parseInt(event.target.value) })}
                      >
                        <FormControlLabel value={1} control={<Radio />} label='1 | Mon | Tue | Wed | Thu | Fri' />
                        <FormControlLabel value={2} control={<Radio />} label='2 | Tue | Wed | Thu | Fri | Sat' />
                        <FormControlLabel value={3} control={<Radio />} label='3 | Wed | Thu | Fri | Sat | Sun' />
                        <FormControlLabel value={4} control={<Radio />} label='4 | Thu | Fri | Sat | Sun | Mon' />
                        <FormControlLabel value={5} control={<Radio />} label='5 | Fri | Sat | Sun | Mon | Tue' />
                        <FormControlLabel value={6} control={<Radio />} label='6 | Sat | Sun | Mon | Tue | Wed' />
                        <FormControlLabel value={7} control={<Radio />} label='7 | Sun | Mon | Tue | Wed | Thu' />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid container direction='column' spacing={2} className={classes.button}>
                    <Grid item>
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff' }}
                        onClick={() => {
                          updateMwsFullTimeRider(eachMWS.month);
                        }}
                      >
                        Update Schedule
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        onClick={() => {
                          getMwsFullTimeRiderById();
                          setNotification('MWS was not updated, retrieving original MWS');
                          showNotification();
                          setCurrMonth(-1);
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </>
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: '10px' }}>
          <Card>
            <MaterialTable title='My Schedule' columns={tableStateWWS.columns} data={wws} />
          </Card>
          <Grid container direction='row' spacing={2}>
            {wws.map((eachWWS) => (
              <Grid item xs={12} sm={12} md={4} lg={4} key={eachWWS.week} style={{ marginTop: '10px' }}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' component='p' align='left' className={classes.scheduleTextInput}>
                      Week: {eachWWS.week}
                    </Typography>
                    <Typography variant='body1' component='p' align='left' className={classes.scheduleTextInput}>
                      Day: {eachWWS.day}
                    </Typography>
                    <Typography variant='body1' component='p' align='left' className={classes.scheduleTextInput}>
                      Time: {eachWWS.starttime} - {eachWWS.endtime}
                    </Typography>
                    <Grid container direction='column' spacing={2} className={classes.button}>
                      <Grid item>
                        <Button
                          variant='contained'
                          style={{ backgroundColor: '#ff3008', color: '#fff' }}
                          onClick={() => {
                            updateMwsFullTimeRider(eachWWS.month);
                          }}
                        >
                          Update Schedule
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant='contained'
                          onClick={() => {
                            getMwsFullTimeRiderById();
                            setNotification('MWS was not updated, retrieving original MWS');
                            showNotification();
                            setCurrMonth(-1);
                          }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Schedule);
