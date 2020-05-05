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
