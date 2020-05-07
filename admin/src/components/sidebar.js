import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import TelegramIcon from '@material-ui/icons/Telegram';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(6),
  },

  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const sidebarTheme = createMuiTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: '40px',
      },
    },
  },
});

const Sidebar = (props) => {
  const { container, mobileOpen, handleDrawerToggle, handleSelectedItem, selectedItem } = props;
  const classes = useStyles();
  const theme = useTheme();

  console.log('here' + selectedItem);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List component='nav' aria-labelledby='nested-list-subheader' className={classes.root}>
        {sessionStorage.getItem('userType') === 'deliveryRider' && (
          <>
            <ListItem button onClick={(event) => handleSelectedItem(event, 0)} selected={selectedItem === 0}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 4)} selected={selectedItem === 4}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={'Restaurants'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 5)} selected={selectedItem === 5}>
              <ListItemIcon>
                <MotorcycleIcon />
              </ListItemIcon>
              <ListItemText primary={'My Schedule'} />
            </ListItem>
          </>
        )}
        {sessionStorage.getItem('userType') === 'restaurantStaff' && (
          <>
            <ListItem button onClick={(event) => handleSelectedItem(event, 0)} selected={selectedItem === 0}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 1)} selected={selectedItem === 1}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={'Orders'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 2)} selected={selectedItem === 2}>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary={'My Promotions'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 3)} selected={selectedItem === 3}>
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary={'My Restaurant'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 4)} selected={selectedItem === 4}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={'Restaurants'} />
            </ListItem>
          </>
        )}
        {sessionStorage.getItem('userType') === 'fdsManager' && (
          <>
            <ListItem button onClick={(event) => handleSelectedItem(event, 0)} selected={selectedItem === 0}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 4)} selected={selectedItem === 4}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={'Restaurants'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 6)} selected={selectedItem === 6}>
              <ListItemIcon>
                <MotorcycleIcon />
              </ListItemIcon>
              <ListItemText primary={'Riders'} />
            </ListItem>
            <ListItem button onClick={(event) => handleSelectedItem(event, 7)} selected={selectedItem === 7}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'FDS Managers'} />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={sidebarTheme}>
      <Hidden mdUp>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={() => handleDrawerToggle()}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </ThemeProvider>
  );
};

export default Sidebar;
