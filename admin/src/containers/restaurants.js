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
import AddAlert from '@material-ui/icons/AddAlert';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';

import * as RestaurantsApis from '../api/restaurants';
import Sidebar from '../components/sidebar';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
}));

const chatTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        // padding: "0px 0px 0px 24px"
      },
    },
  },
});

const Restaurants = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Id', field: 'restaurantid' },
      { title: 'Name', field: 'restaurantname' },
      { title: 'Address', field: 'address' },
      {
        title: 'Postal Code',
        render: (rowData) => (
          <>
            <Link
              underline='none'
              target='_blank'
              href={`https://www.google.com/maps/place/Singapore+${rowData.postalcode}`}
            >
              <Tooltip title='View on Google Maps' placement='bottom'>
                <Typography
                  variant='button'
                  display='block'
                  align='left'
                  style={{
                    color: '#ff3008',
                    width: 90,
                    borderRadius: 5,
                    fontWeight: 'bold',
                  }}
                >
                  {rowData.postalcode.toString().length === 5 ? `0${rowData.postalcode}` : `${rowData.postalcode}`}
                  <OpenInNewIcon fontSize={'small'} />
                </Typography>
              </Tooltip>
            </Link>
          </>
        ),
      },
      { title: 'Min. Order ($)', field: 'minordercost' },
    ],
  });

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    RestaurantsApis.getRestaurants()
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurants. Please contact administrators for assistance',
          });
        }
        props.dispatch({ type: 'SET_RESTAURANTS', data: response.data });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving restaurants. Please contact administrators for assistance',
        });
      });
  };

  return (
    <ThemeProvider theme={chatTheme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <MaterialTable title='Restaurants' columns={tableState.columns} data={props.restaurants} />
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
                  closeNotification={() => setBC(false)}
                  close
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  restaurants: state.reducer.restaurants,
});
export default connect(mapStateToProps)(Restaurants);
