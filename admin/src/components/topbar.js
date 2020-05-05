import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  header: {
    marginTop: '8px',
  },
}));

const Topbar = (props) => {
  const classes = useStyles();
  const { handleDrawerToggle, handleLogout, handleProfile, pathname } = props;

  return (
    <AppBar position='fixed' className={classes.appBar} style={{ backgroundColor: '#ff3008' }}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={() => handleDrawerToggle()}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Grid container style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Grid item>
            <Typography variant='h6' className={classes.header}>
              Admin Management Portal
            </Typography>
          </Grid>
          <Grid item style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Tooltip title='My Profile'>
              <IconButton
                aria-label='accountCircle'
                onClick={() => {
                  handleProfile();
                }}
              >
                <AccountCircleIcon style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            {pathname !== '/logout' && (
              <Tooltip title='Logout' className='logout'>
                <IconButton
                  edge='end'
                  aria-label='logout'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <ExitToAppIcon style={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
