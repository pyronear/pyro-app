import apiClient from './apiClient.service';

const CAMERA_OPENING_ANGLE = 87;
const CAMERA_RANGE_KM = 15;

type alert = {
  id: number;
  created_at: string;
  lat: number;
  lon: number;
  media_id: number;
  event_id: number;
  azimuth: number;
  localization: string;
  device_id: number;
};

async function getAlert(): Promise<alert | undefined> {
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
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculateCoordinatesTriangle(alert: alert): number[][] {
  // calcul des azimuths en radians
  const azimuth1 = toRadians(alert.azimuth - 0.5 * CAMERA_OPENING_ANGLE);
  const azimuth2 = toRadians(alert.azimuth + 0.5 * CAMERA_OPENING_ANGLE);

  //calcul de la latitude en radians
  const latitude = toRadians(alert.lat);

  // calcul des coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_1 = CAMERA_RANGE_KM * Math.cos(azimuth1);
  const dist_lng_1 = CAMERA_RANGE_KM * Math.sin(azimuth1);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat1 = alert.lat + dist_lat_1 / 111.0;
  const lng1 = alert.lon + dist_lng_1 / 111.0 / Math.cos(latitude);

  // calcul des coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_2 = CAMERA_RANGE_KM * Math.cos(azimuth2);
  const dist_lng_2 = CAMERA_RANGE_KM * Math.sin(azimuth2);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat2 = alert.lat + dist_lat_2 / 111.0;
  const lng2 = alert.lon + dist_lng_2 / 111.0 / Math.cos(latitude);

  return [
    [lat1, lng1],
    [alert.lat, alert.lon],
    [lat2, lng2],
    [lat1, lng1],
  ];
}

export const alertsService = {
  getAlert,
  calculateCoordinatesTriangle,
};
