import axios from 'axios';
import Config from '../config.json';

export function getShiftsTable() {
  var link = Config.ipAddress + '/shifts';
  return axios.get(link);
}

export function getMwsFullTimeRiders() {
  var link = Config.ipAddress + '/mws';
  return axios.get(link);
}

export function getMwsFullTimeRiderById(riderID) {
  var link = Config.ipAddress + '/mws/' + riderID;
  return axios.get(link);
}

export function getMwsFullTimeRiderByMonth(riderID, monthID) {
  var link = Config.ipAddress + '/mws/' + riderID + '/' + monthID;
  return axios.get(link);
}

export function getWwsPartTimeRiders() {
  var link = Config.ipAddress + '/wws';
  return axios.get(link);
}

export function getWwsPartTimeRiderById(riderID) {
  var link = Config.ipAddress + '/wws/' + riderID;
  return axios.get(link);
}

export function getWwsPartTimeRiderByMonth(riderID, monthID) {
  var link = Config.ipAddress + '/wws/' + riderID + '/' + monthID;
  return axios.get(link);
}

export function createMwsFullTimeRider(request) {
  var link = Config.ipAddress + '/mws';
  return axios.post(link, request);
}

export function createWwsPartTimeRider(request) {
  var link = Config.ipAddress + '/wws';
  return axios.post(link, request);
}

export function updateMwsFullTimeRider(request) {
  var link = Config.ipAddress + '/mws/update';
  return axios.post(link, request);
}

export function updateWwsPartTimeRider(request) {
  var link = Config.ipAddress + '/wws/update';
  return axios.post(link, request);
}

export function deleteMwsFullTimeRiderByMonth(request) {
  var link = Config.ipAddress + '/mws';
  return axios.delete(link, request);
}

export function deleteWwsPartTimeRiderByWeek(request) {
  var link = Config.ipAddress + '/wws';
  return axios.delete(link, request);
}
