import axios from 'axios';
import Config from '../config.json';

export function getCustomers() {
  var link = Config.ipAddress + '/customers';
  return axios.get(link);
}
