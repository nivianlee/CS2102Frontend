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
import TextField from '@material-ui/core/TextField';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

import { connect } from 'react-redux';
import * as PromotionsApis from '../api/promotions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  radioTextInput: {
    marginBottom: '4px',
  },
  title2: {
    marginBottom: '4px',
    alignItems: 'left',
    justifyContent: 'left',
  },
}));

const promotionTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        // padding: "0px 0px 0px 24px"
      },
    },
  },
});

const Promotion = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [isNewPromotion, setIsNewPromotion] = useState(false);
  const [dates, setDates] = useState({
    startDate: moment(),
    startTime: '00:00',
    endDate: moment(),
    endTime: '23:59',
  });
  const [newPromotion, setNewPromotion] = useState({
    promotionstarttimestamp: '',
    promotionendtimestamp: '',
    promotiontype: 'Amount',
    promotiontypeinfo: '',
  });

  useEffect(() => {
    getPromotionsByRestaurantID();
  }, []);

  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Promotion Id', field: 'promotionid' },
      {
        title: 'Start Date & Time',
        render: (rowData) => (
          <>
            <Tooltip title='YYYY-MM-DD' placement='bottom-start'>
              <Typography variant='body2'>
                {moment(rowData.starttimestamp).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Tooltip>
          </>
        ),
      },
      {
        title: 'End Date & Time',
        render: (rowData) => (
          <>
            <Tooltip title='YYYY-MM-DD' placement='bottom-start'>
              <Typography variant='body2'>{moment(rowData.endtimestamp).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Tooltip>
          </>
        ),
      },
      { title: 'Description', field: 'promodescription' },
    ],
  });

  const postPromotion = async () => {
    const startDateTime = moment(dates.startDate).format('MM/DD/YYYY') + ' ' + dates.startTime;
    const endDateTime = moment(dates.endDate).format('MM/DD/YYYY') + ' ' + dates.endTime;
    const data = {
      promotionstarttimestamp: startDateTime,
      promotionendtimestamp: endDateTime,
      promotiontype: newPromotion.promotiontype,
      promotiontypeinfo: newPromotion.promotiontypeinfo,
    };
    PromotionsApis.postPromotion(sessionStorage.getItem('id'), data)
      .then((response) => {
        if (response.status !== 200) {
        }
        getPromotionsByRestaurantID();
        setIsNewPromotion(false);
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {});
  };

  const getPromotionsByRestaurantID = async () => {
    PromotionsApis.getPromotionsByRestaurantID(sessionStorage.getItem('restaurantID'))
      .then((response) => {
        if (response.status !== 200) {
        }
        setPromotions(response.data);
      })
      .catch((err) => {});
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  return (
    <ThemeProvider theme={promotionTheme}>
      <Grid container direction='column'>
        <Grid container direction='row'>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction='row'
                  className={classes.card}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  {isNewPromotion ? (
                    <Grid item>
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff', marginRight: '5px' }}
                        onClick={() => {
                          postPromotion();
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setIsNewPromotion(false);
                          getPromotionsByRestaurantID();
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
                          setIsNewPromotion(true);
                        }}
                      >
                        Add new Promotion
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {isNewPromotion && (
          <Grid container direction='row' style={{ marginTop: '10px' }}>
            <Grid item xs={4} sm={4} md={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='p' align='left' className={classes.title2}>
                    New Promotion
                  </Typography>
                  <Grid item xs={12} sm={12} md={12} lg={12} className={classes.radioTextInput}>
                    <TextField
                      id='standard-full-width'
                      name='promotiontypeinfo'
                      fullWidth
                      label='Info'
                      value={newPromotion.promotiontypeinfo}
                      onChange={(event) =>
                        setNewPromotion({ ...newPromotion, [event.target.name]: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} className={classes.radioTextInput}>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Type</FormLabel>
                      <RadioGroup
                        aria-label='type'
                        name='promotiontype'
                        value={newPromotion.promotiontype}
                        onChange={(event) =>
                          setNewPromotion({ ...newPromotion, [event.target.name]: event.target.value })
                        }
                      >
                        <FormControlLabel
                          value={'TargettedPromoCode'}
                          control={<Radio />}
                          label='Targetted Promo Code'
                        />
                        <FormControlLabel value={'Percentage'} control={<Radio />} label='Percentage' />
                        <FormControlLabel value={'Amount'} control={<Radio />} label='Amount' />
                        <FormControlLabel value={'FreeDelivery'} control={<Radio />} label='Free Delivery' />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid container direction='row' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant='inline'
                          format='MM/dd/yyyy'
                          margin='normal'
                          id='date-picker-inline'
                          name='startDate'
                          label='Start Date'
                          value={dates.startDate}
                          onChange={(date) => setDates({ ...dates, startDate: date })}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} style={{ marginTop: '15px' }}>
                      <TextField
                        id='time'
                        label='Start Time'
                        type='time'
                        name='startTime'
                        value={dates.startTime}
                        className={classes.textField}
                        onChange={(event) => setDates({ ...dates, [event.target.name]: event.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction='row' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant='inline'
                          format='MM/dd/yyyy'
                          margin='normal'
                          id='date-picker-inline'
                          name='endDate'
                          label='End Date'
                          value={dates.endDate}
                          onChange={(date) => setDates({ ...dates, endDate: date })}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} style={{ marginTop: '15px' }}>
                      <TextField
                        id='time'
                        label='End Time'
                        type='time'
                        name='endTime'
                        value={dates.endTime}
                        className={classes.textField}
                        onChange={(event) => setDates({ ...dates, [event.target.name]: event.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        <Grid container direction='row' style={{ marginTop: '10px' }}>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <MaterialTable title='My Promotions' columns={tableState.columns} data={promotions} />
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
                icon={<AddAlert />}
                message={notification}
                open={bc}
                onClose={() => setBC(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Promotion);
