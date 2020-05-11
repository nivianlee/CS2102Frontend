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
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';
import { DropzoneDialog } from 'material-ui-dropzone';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AddAlert from '@material-ui/icons/AddAlert';

import * as FDSManagersApis from '../api/fdsManagers';
import * as RestaurantStaffApis from '../api/restaurantstaff';
import * as RestaurantsApis from '../api/restaurants';
import * as RidersApis from '../api/riders';

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

const Restaurant = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);
  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Staff ID', field: 'restaurantstaffid', editable: 'never' },
      { title: 'Staff Name', field: 'restaurantstaffname' },
    ],
  });
  const [isUpdateFoodItem, setIsUpdateFoodItem] = useState(false);
  const [selectedFoodItemID, setSelectedFoodItemID] = useState(-1);
  const [restaurant, setRestaurant] = useState({
    restaurantID: -1,
    restaurantName: '',
    minOrderCost: '',
    contactNum: '',
    address: '',
    postalCode: '',
  });
  const [foodItem, setFoodItem] = useState({
    foodItemID: -1,
    foodItemName: '',
    category: '',
    maxNumOfOrders: -1,
    price: -1,
    availabilityStatus: false,
    restaurantID: -1,
  });
  const [isNewFoodItem, setIsNewFoodItem] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState({
    foodItemID: -1,
    foodItemName: '',
    category: '',
    maxNumOfOrders: -1,
    price: -1,
    availabilityStatus: false,
    restaurantID: -1,
  });
  const [foodItems, setFoodItems] = useState([]);
  const [restaurantStaff, setRestaurantStaff] = useState([]);
  const [isUploadImage, setIsUploadImage] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('userType') === 'restaurantStaff') {
      getRestaurantById();
      getFoodItemsByRestaurantId();
      getRestaurantStaffs();
    }
  }, []);

  const getRestaurantById = async () => {
    RestaurantsApis.getRestaurantById(sessionStorage.getItem('restaurantID'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurant. Please contact administrators for assistance',
          });
        }
        setRestaurant({
          ...restaurant,
          restaurantID: response.data[0].restaurantid,
          restaurantName: response.data[0].restaurantname,
          minOrderCost: response.data[0].minordercost,
          contactNum: response.data[0].contactnum,
          address: response.data[0].address,
          postalCode: response.data[0].postalcode,
        });
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving restaurants. Please contact administrators for assistance',
        });
      });
  };

  const getFoodItemsByRestaurantId = async () => {
    RestaurantsApis.getFoodItemsByRestaurantId(sessionStorage.getItem('restaurantID'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurant staff. Please contact administrators for assistance',
          });
        }
        setFoodItems(response.data);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving restaurant staff. Please contact administrators for assistance',
        });
      });
  };

  const getRestaurantStaffs = async () => {
    RestaurantStaffApis.getRestaurantStaffs(sessionStorage.getItem('restaurantID'))
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error retrieving restaurant. Please contact administrators for assistance',
          });
        }
        setRestaurantStaff(response.data);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error retrieving restaurants. Please contact administrators for assistance',
        });
      });
  };

  const updateRestaurant = async () => {
    RestaurantsApis.updateRestaurant(restaurant, restaurant.restaurantID)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating restaurant. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();

        getRestaurantById();
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating restaurant. Please contact administrators for assistance',
        });
      });
  };

  const updateFoodItemStatus = async (foodItem) => {
    const newFoodItem = {
      foodItemID: foodItem.fooditemid,
      foodItemName: foodItem.fooditemname,
      category: foodItem.category,
      maxNumOfOrders: foodItem.maxnumoforders,
      price: foodItem.price,
      image: 'FoodItemID_31',
      availabilityStatus: !foodItem.availabilitystatus,
      restaurantID: foodItem.restaurantid,
    };
    RestaurantStaffApis.updateFoodItem(sessionStorage.getItem('id'), newFoodItem)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating food item. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();
        getFoodItemsByRestaurantId();
        setSelectedFoodItemID(-1);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating food items. Please contact administrators for assistance',
        });
      });
  };

  const updateFoodItem = async () => {
    RestaurantStaffApis.updateFoodItem(sessionStorage.getItem('id'), foodItem)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating food item. Please contact administrators for assistance',
          });
        }
        setNotification(response.data);
        showNotification();
        getFoodItemsByRestaurantId();
        setSelectedFoodItemID(-1);

        setIsUpdateFoodItem(false);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating food items. Please contact administrators for assistance',
        });
      });
  };

  const createFoodItem = async () => {
    const data = {
      foodItemName: newFoodItem.foodItemName,
      category: newFoodItem.category,
      maxNumOfOrders: newFoodItem.maxNumOfOrders,
      price: newFoodItem.price,
      availabilityStatus: true,
      restaurantID: sessionStorage.getItem('restaurantID'),
    };

    RestaurantStaffApis.createFoodItem(sessionStorage.getItem('id'), data)
      .then((response) => {
        if (response.status !== 200) {
          props.dispatch({
            type: 'SET_ERRORMESSAGE',
            data: 'Error updating food item. Please contact administrators for assistance',
          });
        }
        setNotification('Food Item created successfully!');
        showNotification();
        getFoodItemsByRestaurantId();
        setIsNewFoodItem(false);
      })
      .catch((err) => {
        props.dispatch({
          type: 'SET_ERRORMESSAGE',
          data: 'Error updating food items. Please contact administrators for assistance',
        });
      });
  };

  const editButton = (foodItem) => {
    setFoodItem({
      ...foodItem,
      foodItemID: foodItem.fooditemid,
      foodItemName: foodItem.fooditemname,
      category: foodItem.category,
      maxNumOfOrders: foodItem.maxnumoforders,
      price: foodItem.price,
      availabilityStatus: foodItem.availabilitystatus,
      restaurantID: foodItem.restaurantid,
    });
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };

  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

  return (
    <Grid container direction='row' className={classes.card} spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={5}>
        <Card>
          <CardContent>
            <Typography variant='h5' component='p' align='left' className={classes.title}>
              My Restaurant
            </Typography>
            <Grid container direction='row' spacing={2} className={classes.input}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id='standard-full-width'
                  name='restaurantID'
                  fullWidth
                  label='Restaurant ID'
                  disabled={true}
                  value={restaurant.restaurantID}
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id='standard-full-width'
                  name='restaurantName'
                  fullWidth
                  label='Restaurant Name'
                  helperText='Proper casing preferred e.g. Papa John'
                  value={restaurant.restaurantName}
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  type='number'
                  id='standard-full-width'
                  name='minOrderCost'
                  fullWidth
                  label='Minimum order cost'
                  helperText='Minimum cost of order e.g. 15'
                  value={restaurant.minOrderCost}
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  type='number'
                  id='standard-full-width'
                  name='contactNum'
                  fullWidth
                  label='Restaurant Contact Number'
                  multiline
                  value={restaurant.contactNum}
                  helperText='Omit plus sign, spaces, and dashes e.g. 84997406'
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id='standard-full-width'
                  name='address'
                  fullWidth
                  label='Restaurant Address'
                  multiline
                  value={restaurant.address}
                  helperText='E.g. 123 Clementi Ave 3, #01-23, 321 Clementi'
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  type='number'
                  id='standard-full-width'
                  name='postalCode'
                  fullWidth
                  label='Restaurant Postal Code'
                  multiline
                  value={restaurant.postalCode}
                  helperText='E.g. 120321'
                  onChange={(event) => setRestaurant({ ...restaurant, [event.target.name]: event.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container direction='column' spacing={2} className={classes.button}>
              <Grid item>
                <Button
                  variant='contained'
                  style={{ backgroundColor: '#ff3008', color: '#fff' }}
                  onClick={() => {
                    updateRestaurant();
                  }}
                >
                  Update Restaurant
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => {
                    getRestaurantById();
                    setNotification('Restaurant details was not updated, retrieving original restaurant details');
                    showNotification();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={7}>
        <Card>
          <MaterialTable title='Restaurant Staff' columns={tableState.columns} data={restaurantStaff} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant='h5' component='p' align='left' className={classes.title2}>
              Food Items
            </Typography>
            <Grid container direction='row' spacing={1}>
              {foodItems.map((curFoodItem) => (
                <Grid item xs={12} sm={12} md={12} lg={4} key={curFoodItem.fooditemid}>
                  <Card>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <CardMedia
                        component='img'
                        className={classes.media}
                        title={curFoodItem.fooditemname}
                        image={images[`FoodItemID_${curFoodItem.fooditemid}.png`]}
                      />
                    </Grid>
                    {isUpdateFoodItem && curFoodItem.fooditemid === selectedFoodItemID ? (
                      <Grid container direction='column' className={classes.foodItemText}>
                        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.foodItemTextInput}>
                          <TextField
                            id='standard-full-width'
                            name='foodItemID'
                            fullWidth
                            label='Food Item ID'
                            disabled={true}
                            value={foodItem.foodItemID}
                            onChange={(event) => setFoodItem({ ...foodItem, [event.target.name]: event.target.value })}
                          />
                        </Grid>
                        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.foodItemTextInput}>
                          <TextField
                            id='standard-full-width'
                            name='foodItemName'
                            fullWidth
                            label='Food Item Name'
                            helperText='Proper casing preferred e.g. Fried Rice'
                            value={foodItem.foodItemName}
                            onChange={(event) => setFoodItem({ ...foodItem, [event.target.name]: event.target.value })}
                          />
                        </Grid>
                        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.foodItemTextInput}>
                          <TextField
                            id='standard-full-width'
                            name='category'
                            fullWidth
                            label='Category'
                            helperText='Proper casing preferred e.g. Chinese'
                            value={foodItem.category}
                            onChange={(event) => setFoodItem({ ...foodItem, [event.target.name]: event.target.value })}
                          />
                        </Grid>
                        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.foodItemTextInput}>
                          <TextField
                            id='standard-full-width'
                            name='maxNumOfOrders'
                            fullWidth
                            label='Max No. Of Orders'
                            helperText='Proper casing preferred e.g. Chinese'
                            value={foodItem.maxNumOfOrders}
                            onChange={(event) => setFoodItem({ ...foodItem, [event.target.name]: event.target.value })}
                          />
                        </Grid>
                        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.foodItemTextInput}>
                          <TextField
                            id='standard-full-width'
                            name='price'
                            fullWidth
                            label='Price'
                            helperText='e.g. 15'
                            value={foodItem.price}
                            onChange={(event) => setFoodItem({ ...foodItem, [event.target.name]: event.target.value })}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container direction='column' className={classes.foodItemText}>
                        <Typography variant='h5' component='p' align='left'>
                          {curFoodItem.fooditemname}
                        </Typography>
                        <Typography variant='body1' component='p' align='left'>
                          Food Item ID: {curFoodItem.fooditemid}
                        </Typography>
                        <Typography variant='body1' component='p' align='left'>
                          Category: {curFoodItem.category}
                        </Typography>
                        <Typography variant='body1' component='p' align='left'>
                          Max No. of Orders: {curFoodItem.maxnumoforders}
                        </Typography>
                        <Typography variant='body1' component='p' align='left'>
                          Price: ${curFoodItem.price}
                        </Typography>
                        <Typography variant='body1' component='p' align='left'>
                          Available?: {curFoodItem.availabilitystatus ? 'Yes' : 'No'}
                        </Typography>
                      </Grid>
                    )}
                    {isUpdateFoodItem && curFoodItem.fooditemid === selectedFoodItemID ? (
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff', width: '100px' }}
                        onClick={() => {
                          updateFoodItem();
                        }}
                        className={classes.foodItemButton}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#ff3008', color: '#fff', width: '70px' }}
                        onClick={() => {
                          editButton(curFoodItem);
                          setIsUpdateFoodItem(true);
                          setSelectedFoodItemID(curFoodItem.fooditemid);
                        }}
                        className={classes.foodItemButton}
                      >
                        Edit
                      </Button>
                    )}
                    {isUpdateFoodItem && curFoodItem.fooditemid === selectedFoodItemID ? (
                      <Button
                        variant='contained'
                        style={{ width: '100px' }}
                        onClick={(event) => {
                          setFoodItem({
                            ...foodItem,
                            foodItemID: -1,
                            foodItemName: '',
                            category: '',
                            maxNumOfOrders: -1,
                            price: -1,
                            availabilityStatus: false,
                            restaurantID: -1,
                          });
                          getFoodItemsByRestaurantId();
                          setIsUpdateFoodItem(false);
                        }}
                        className={classes.foodItemButton}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        style={{ width: '160px' }}
                        onClick={(event) => {
                          updateFoodItemStatus(curFoodItem);
                        }}
                        className={classes.foodItemButton}
                      >
                        {curFoodItem.availabilitystatus ? 'Set Unavailable' : 'Set Available'}
                      </Button>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container direction='row' className={classes.card} style={{ padding: '7px' }}>
        <Grid item xs={12} sm={12} md={4}>
          <Card>
            <CardContent>
              <Grid container direction='row' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isNewFoodItem ? (
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#ff3008', color: '#fff', marginRight: '5px' }}
                      onClick={() => {
                        createFoodItem();
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setIsNewFoodItem(false);
                        getFoodItemsByRestaurantId();
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
                        setIsNewFoodItem(true);
                      }}
                    >
                      Add new Food Item
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isNewFoodItem && (
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Card>
            <Grid container direction='column' className={classes.foodItemText}>
              <Grid item xs={10} sm={10} md={10} lg={10} className={classes.foodItemTextInput}>
                <Button variant='contained' onClick={() => setIsUploadImage(true)}>
                  Add Image
                </Button>
                <DropzoneDialog
                  open={isUploadImage}
                  onSave={() => {
                    setIsUploadImage(false);
                    setNotification('Image has been uploaded!');
                    showNotification();
                  }}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={() => setIsUploadImage(false)}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className={classes.foodItemTextInput}>
                <TextField
                  id='standard-full-width'
                  name='foodItemName'
                  fullWidth
                  label='Food Item Name'
                  helperText='Proper casing preferred e.g. Fried Rice'
                  value={newFoodItem.foodItemName}
                  onChange={(event) => setNewFoodItem({ ...newFoodItem, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className={classes.foodItemTextInput}>
                <TextField
                  id='standard-full-width'
                  name='category'
                  fullWidth
                  label='Category'
                  helperText='Proper casing preferred e.g. Chinese'
                  value={newFoodItem.category}
                  onChange={(event) => setNewFoodItem({ ...newFoodItem, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className={classes.foodItemTextInput}>
                <TextField
                  id='standard-full-width'
                  name='maxNumOfOrders'
                  fullWidth
                  label='Max No. Of Orders'
                  helperText='Proper casing preferred e.g. Chinese'
                  value={newFoodItem.maxNumOfOrders}
                  onChange={(event) => setNewFoodItem({ ...newFoodItem, [event.target.name]: event.target.value })}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className={classes.foodItemTextInput}>
                <TextField
                  id='standard-full-width'
                  name='price'
                  fullWidth
                  label='Price'
                  helperText='e.g. 15'
                  value={newFoodItem.price}
                  onChange={(event) => setNewFoodItem({ ...newFoodItem, [event.target.name]: event.target.value })}
                />
              </Grid>
            </Grid>
          </Card>
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

const mapStateToProps = (state) => ({
  loggedInUserType: state.reducer.loggedInUserType,
});
export default connect(mapStateToProps)(Restaurant);
