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
  return axios.post(link, request);
}

export function deleteRestaurants(restaurantId) {
  var link = Config.ipAddress + "/restaurants/" + restaurantId;
  return axios.delete(link);
}
