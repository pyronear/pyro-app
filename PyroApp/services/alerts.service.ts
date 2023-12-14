import apiClient from './apiClient.service';

async function getAlerts() {
  apiClient
    .get('/alerts/')
    .then(response => {
      console.log('OK!');
      if (response.data.length > 0) {
        console.log(response.data[0]);
      }
    })
    .catch(e => console.log('ERROR', e));
}

export const alertsService = {
  getAlerts,
};
