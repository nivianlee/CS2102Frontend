import axios from 'axios';
import Config from '../config.json';

export function getFDSManagers() {
  var link = Config.ipAddress + '/fdsManagers';
  return axios.get(link);
}

export function getFDSManagerById(fdsManagerId) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId;
  return axios.get(link);
}

export function createFDSManager(request) {
  var link = Config.ipAddress + '/fdsManagers';
  return axios.post(link, request);
}

export function updateFDSManager(request, fdsManagerId) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId;
  return axios.post(link, request);
}

export function deleteFDSManagers(fdsManagerId) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId;
  return axios.delete(link);
}

export function getFDSManagerSummaryOne() {
  var link = Config.ipAddress + '/fdsManagers/summaryOne';
  return axios.get(link);
}

export function getFDSManagerSummaryTwo() {
  var link = Config.ipAddress + '/fdsManagers/summaryTwo';
  return axios.get(link);
}

export function getFDSManagerSummaryThree() {
  var link = Config.ipAddress + '/fdsManagers/summaryThree';
  return axios.get(link);
}

export function getFDSManagerSummaryFour() {
  var link = Config.ipAddress + '/fdsManagers/summaryFour';
  return axios.get(link);
}

export function postPromotion(fdsManagerId, request) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId + '/promotion';
  return axios.post(link, request);
}
