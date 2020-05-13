<<<<<<< HEAD
import axios from "axios";
import Config from "../config.json";

export function getRestaurants() {
  var link = Config.ipAddress + "/restaurants";
  return axios.get(link);
}

export function getRestaurantById(request, restaurantId) {
  var link = Config.ipAddress + "/restaurants/" + restaurantId;
  return axios.post(link, request);
}

export function getRestaurantByName(request, restaurantName) {
  var link = Config.ipAddress + "/restaurants/restaurantname/" + restaurantName;
  return axios.post(link, request);
}

export function getRestaurantByLocation(request, restaurantLocation) {
  var link = Config.ipAddress + "/restaurants/restaurantlocation/" + restaurantLocation;
  return axios.post(link, request);
}

export function createRestaurants(request) {
  var link = Config.ipAddress + "/restaurants";
  return axios.post(link, request);
}

export function updateRestaurants(request, restaurantId) {
  var link = Config.ipAddress + "/restaurants/" + restaurantId;
=======
import axios from 'axios';
import Config from '../config.json';

export function getRestaurants() {
  var link = Config.ipAddress + '/restaurants';
  return axios.get(link);
}

export function getRestaurantById(restaurantId) {
  var link = Config.ipAddress + '/restaurants/' + restaurantId;
  return axios.get(link);
}

export function getRestaurantByName(request, restaurantName) {
  var link = Config.ipAddress + '/restaurants/restaurantname/' + restaurantName;
  return axios.get(link, request);
}

export function getRestaurantByLocation(request, restaurantLocation) {
  var link = Config.ipAddress + '/restaurants/restaurantlocation/' + restaurantLocation;
  return axios.get(link, request);
}

export function createRestaurant(request) {
  var link = Config.ipAddress + '/restaurants';
  return axios.post(link, request);
}

export function updateRestaurant(request, restaurantId) {
  var link = Config.ipAddress + '/restaurants/' + restaurantId;
>>>>>>> 588d26a776e75c9894e85dc70488e840e4eef36e
  return axios.post(link, request);
}

export function deleteRestaurants(restaurantId) {
<<<<<<< HEAD
  var link = Config.ipAddress + "/restaurants/" + restaurantId;
  return axios.delete(link);
}
=======
  var link = Config.ipAddress + '/restaurants/' + restaurantId;
  return axios.delete(link);
}

export function getFoodItemsByRestaurantId(restaurantID) {
  var link = Config.ipAddress + '/fooditems/' + restaurantID;
  return axios.get(link);
}
>>>>>>> 588d26a776e75c9894e85dc70488e840e4eef36e
