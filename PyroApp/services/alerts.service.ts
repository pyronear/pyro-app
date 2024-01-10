import apiClient from './apiClient.service';

async function getAlerts() {
  try {
    const response = await apiClient.get('/alerts/');

    if (response.data.length > 0) {
      return response.data[0];
    }
  } catch (error) {
    console.error('ERROR', error);
    throw error;
  }
}

export const alertsService = {
  getAlerts,
};
