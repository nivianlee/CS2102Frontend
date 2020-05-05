import axios from 'axios';
import Config from '../config.json';

export function getRestaurantStaffs(restaurantID) {
  var link = Config.ipAddress + '/restaurants/' + restaurantID + '/restaurantstaff';
  return axios.get(link);
}

export function getRestaurantStaffById(restaurantID, restaurantStaffID) {
  var link = Config.ipAddress + '/restaurants/' + restaurantID + '/restaurantstaff/' + restaurantStaffID;
  return axios.get(link);
}

export function createRestaurantStaff(request) {
  var link = Config.ipAddress + '/restaurantstaff/';
  return axios.post(link, request);
}

export function updateRestaurantStaff(request, restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID;
  return axios.put(link, request);
}

export function deleteRestaurantStaff(restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID;
  return axios.delete(link);
}

export function createFoodItem(restaurantStaffID, request) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID + '/fooditems';
  return axios.create(link, request);
}

export function updateFoodItem(restaurantStaffID, request) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID + '/fooditems';
  return axios.put(link, request);
}

export function deleteFoodItem(restaurantStaffID, request) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID + '/fooditems';
  return axios.delete(link, request);
}

export function getAllCompletedOrders(restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/orders/' + restaurantStaffID;
  return axios.get(link);
}

export function getMonthlyCompletedOrders(year, month, restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/monthlyOrders/' + year + '/' + month + '/' + restaurantStaffID;
  return axios.get(link);
}

export function getMonthlyCompletedOrdersStatistics(year, month, restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/monthlyStatistics/' + year + '/' + month + '/' + restaurantStaffID;
  return axios.get(link);
}

export function getMonthlyFavouriteFoodItems(year, month, restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/monthlyFavourites/' + year + '/' + month + '/' + restaurantStaffID;
  return axios.get(link);
}
