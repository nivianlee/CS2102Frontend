import React, { useState, useEffect } from 'react';
import '../App.css';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddAlert from '@material-ui/icons/AddAlert';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';

import * as FDSManagersApis from '../api/fdsManagers';
import Sidebar from '../components/sidebar';
import { Redirect } from 'react-router-dom';
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
    padding: theme.spacing(3),
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

const FDSManagers = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Manager ID', field: 'managerid', editable: 'never' },
      { title: 'Manager Name', field: 'managername' },
    ],
  });

  useEffect(() => {
    getFDSManagers();
  }, []);

  const getFDSManagers = async () => {
    FDSManagersApis.getFDSManagers()
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving FDS managers. Please contact administrators for assistance',
          });
        }
        props.dispatch({ type: 'SET_FDSMANAGERS', data: response.data });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving FDS managers. Please contact administrators for assistance',
        });
      });
  };

  const updateFDSManagers = async (newData) => {
    const managerid = newData.managerid;
    const updateData = { managerName: newData.managername, contactNum: newData.contactnum };
    FDSManagersApis.updateFDSManager(updateData, managerid)
      .then((response) => {
        if (response.status !== 201) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating FDS manager. Please contact administrators for assistance',
          });
        }
        getFDSManagers();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating FDS manager. Please contact administrators for assistance',
        });
      });
  };

  const deleteFDSManagers = async (newData) => {
    const managerid = newData.managerid;
    FDSManagersApis.deleteFDSManagers(managerid)
      .then((response) => {
        if (response.status !== 201) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error deleting FDS manager. Please contact administrators for assistance',
          });
        }
        getFDSManagers();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error deleting FDS Manager. Please contact administrators for assistance',
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
    <ThemeProvider theme={chatTheme}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <MaterialTable
              title='FDS Managers'
              columns={tableState.columns}
              data={props.fdsManagers}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        updateFDSManagers(newData, oldData);
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      deleteFDSManagers(oldData);
                    }, 600);
                  }),
              }}
            />
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
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  fdsManagers: state.reducer.fdsManagers,
});
export default connect(mapStateToProps)(FDSManagers);
