import axios from 'axios';
import Config from '../config.json';

export function getPromotions() {
  var link = Config.ipAddress + '/promotions';
  return axios.get(link);
}

export function getPromotionsByID(promotionID) {
  var link = Config.ipAddress + '/promotions/' + promotionID;
  return axios.get(link);
}

export function getPromotionsByRestaurantID(restaurantID) {
  var link = Config.ipAddress + '/promotions/restaurant/' + restaurantID;
  return axios.get(link);
}

export function postPromotion(restaurantStaffID, request) {
  var link = Config.ipAddress + '/restaurantstaff/' + restaurantStaffID + '/promotion';
  return axios.post(link, request);
}

export function getPromotionalCampaignsStatistics(restaurantStaffID) {
  var link = Config.ipAddress + '/restaurantstaff/promotionStatistics/' + restaurantStaffID;
  return axios.get(link);
}
