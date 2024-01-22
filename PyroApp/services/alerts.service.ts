import apiClient from './apiClient.service';

async function getAlert() {
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

// Fonction pour convertir les degrés en radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Fonction pour convertir les radians en degrés
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function calculateCoordinatesTriangle(alert) {
  // je calcule mes azimuths en radians
  const azimuth1 = toRadians(alert.azimuth - 0.5 * 87);
  const azimuth2 = toRadians(alert.azimuth + 0.5 * 87);

  const latitude = toRadians(alert.lat);

  // calcul les coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_1 = 15 * Math.cos(azimuth1);
  const dist_lng_1 = 15 * Math.sin(azimuth1);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat1 = alert.lat + dist_lat_1 / 111.0;
  const lng1 = alert.lon + dist_lng_1 / 111.0 / Math.cos(latitude);

  // calcul les coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_2 = 15 * Math.cos(azimuth2);
  const dist_lng_2 = 15 * Math.sin(azimuth2);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat2 = alert.lat + dist_lat_2 / 111.0;
  const lng2 = alert.lon + dist_lng_2 / 111.0 / Math.cos(latitude);

  return [
    [lat1, lng1],
    [alert.lat, alert.lon],
    [lat2, lng2],
  ];
}

export const alertsService = {
  getAlert,
  calculateCoordinatesTriangle,
};
