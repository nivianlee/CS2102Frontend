import axios from 'axios';
import Config from '../config.json';

export function getFDSManagers() {
  var link = Config.ipAddress + '/fdsManagers';
  return axios.get(link);
}

export function createFDSManager(request) {
  var link = Config.ipAddress + '/fdsManagers';
  return axios.post(link, request);
}

export function updateFDSManagers(request, fdsManagerId) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId;
  return axios.post(link, request);
}

export function deleteFDSManagers(fdsManagerId) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId;
  return axios.delete(link);
}
