import apiClient from './apiClient.service';

async function getAlerts() {
  apiClient
    .get('/alerts/')
    .then(response => {
      console.log('OK!');
      console.log(response.data[0]);
    })
    .catch(e => console.log('ERROR', e));
}

export const alertsService = {
  getAlerts,
};
