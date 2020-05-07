import axios from 'axios';
import Config from '../config.json';

export function getRiders() {
  var link = Config.ipAddress + '/riders';
  return axios.get(link);
}

export function getRiderById(riderID) {
  var link = Config.ipAddress + '/riders/' + riderID;
  return axios.get(link);
}

export function createRiders(request) {
  var link = Config.ipAddress + '/riders';
  return axios.post(link, request);
}

export function updateRider(request, riderID) {
  var link = Config.ipAddress + '/riders/' + riderID;
  return axios.put(link, request);
}

export function getAllRidersSummary() {
  var link = Config.ipAddress + '/riders/1/getAllRidersSummary';
  return axios.get(link);
}

export function getRiderSummaryById(riderID) {
  var link = Config.ipAddress + '/riders/' + riderID + '/getRiderSummaryById';
  return axios.get(link);
}

export function getOrdersByRiderId(riderID) {
  var link = Config.ipAddress + '/riders/' + riderID + '/getOrdersByRiderId';
  return axios.get(link);
}

export function toggleUpdateRiderOrderTimestamp(request) {
  var link = Config.ipAddress + '/riders/toggleOrderTimestamp';
  return axios.post(link, request);
}
