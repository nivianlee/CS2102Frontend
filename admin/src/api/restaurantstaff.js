import axios from 'axios';
import Config from '../config.json';

export function getRestaurantStaffs(restaurantId) {
  var link = Config.ipAddress + '/restaurants/' + restaurantId + '/restaurantstaff';
  return axios.get(link);
}

export function getRestaurantStaffById(restaurantId, restaurantstaffId) {
  var link = Config.ipAddress + '/restaurants/' + restaurantId + '/restaurantstaff/' + restaurantstaffId;
  return axios.get(link);
}

export function createRestaurantStaff(request) {
  var link = Config.ipAddress + '/restaurantstaff/';
  return axios.post(link, request);
}

export function updateRestaurantStaff(request, restaurantstaffId) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantstaffId;
  return axios.put(link, request);
}
