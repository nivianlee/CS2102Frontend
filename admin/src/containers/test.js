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

const Test = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);
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
          throw Error(response.status);
        }
        console.log(response.data);
        props.dispatch({ type: 'SET_FDSMANAGERS', data: response.data });
      })
      .catch((err) => {
        //handle error
      });
  };

  const createFDSManagers = async (newData) => {
    FDSManagersApis.createFDSManagers(newData)
      .then((response) => {
        if (response.status !== 201) {
          throw Error(response.status);
        }
        getFDSManagers();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {
        //handle error
      });
  };

  const updateFDSManagers = async (newData) => {
    const managerid = newData.managerid;
    const updateData = { managername: newData.managername };
    FDSManagersApis.updateFDSManagers(updateData, managerid)
      .then((response) => {
        if (response.status !== 201) {
          throw Error(response.status);
        }
        getFDSManagers();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {
        //handle error
      });
  };

  const deleteFDSManagers = async (newData) => {
    const managerid = newData.managerid;
    FDSManagersApis.deleteFDSManagers(managerid)
      .then((response) => {
        if (response.status !== 201) {
          throw Error(response.status);
        }
        getFDSManagers();
        setNotification(response.data);
        showNotification();
      })
      .catch((err) => {
        //handle error
      });
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  const handleSelectedItem = (event, index) => {
    console.log(index);
    setSelectedItem(index);
  };

  const handleDrawerToggle = () => {
    console.log('fire');
    setMobileOpen(!mobileOpen);
  };

  if (selectedItem === 3) {
    return <Redirect to='/test' />;
  }

  return (
    <>
      <ThemeProvider theme={chatTheme}>
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Sidebar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            handleSelectedItem={handleSelectedItem}
            selectedItem={selectedItem}
          />
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Card>
                <MaterialTable
                  title='FDS Managers'
                  columns={tableState.columns}
                  data={props.fdsManagers}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          createFDSManagers(newData);
                        }, 600);
                      }),
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
        </main>
      </ThemeProvider>
    </>
  );
};
const mapStateToProps = (state) => ({
  fdsManagers: state.reducer.fdsManagers,
});
export default connect(mapStateToProps)(Test);
