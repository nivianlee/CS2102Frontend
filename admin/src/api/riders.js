import axios from 'axios';
import Config from '../config.json';

export function getRiders() {
  var link = Config.ipAddress + '/riders';
  return axios.get(link);
}

export function createRiders(request) {
  var link = Config.ipAddress + '/riders';
  return axios.post(link, request);
}
