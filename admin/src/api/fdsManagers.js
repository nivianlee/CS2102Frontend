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

export function getFDSManagerSummaryTwoByCustomerId(customerID) {
  var link = Config.ipAddress + '/fdsManagers/summaryTwoByCustomerId/' + customerID;
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

export function getFDSManagerSummaryFourByRiderId(riderID) {
  var link = Config.ipAddress + '/fdsManagers/summaryFourByRiderId/' + riderID;
  return axios.get(link);
}

export function postPromotion(fdsManagerId, request) {
  var link = Config.ipAddress + '/fdsManagers/' + fdsManagerId + '/promotion';
  return axios.post(link, request);
}

export function getCustomersIDs() {
  var link = Config.ipAddress + '/fdsManagers/customers';
  return axios.get(link);
}

export function getRidersIDs() {
  var link = Config.ipAddress + '/fdsManagers/riders';
  return axios.get(link);
}
