import {LatLng} from 'react-native-leaflet-view';
import apiClient from './apiClient.service';

const CAMERA_OPENING_ANGLE = 87;
const CAMERA_RANGE_KM = 15;
const CONVERTION_KM_TO_DEG = 111.0;

export type Alert = {
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

async function getAlerts(): Promise<Alert[]> {
  const response = await apiClient.get('/alerts/ongoing');
  return response.data;
}

async function getAlert(): Promise<Alert> {
  const response = await apiClient.get('/alerts/');
  return response.data[0];
}

// Fonction pour convertir les degrés en radians
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculateCoordinatesTriangle(alert: Alert): LatLng[] {
  // calcul des azimuths en radians
  const azimuth1 = toRadians(alert.azimuth - 0.5 * CAMERA_OPENING_ANGLE);
  const azimuth2 = toRadians(alert.azimuth + 0.5 * CAMERA_OPENING_ANGLE);

  //calcul de la latitude en radians
  const latitude = toRadians(alert.lat);

  // calcul des coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_1 = CAMERA_RANGE_KM * Math.cos(azimuth1);
  const dist_lng_1 = CAMERA_RANGE_KM * Math.sin(azimuth1);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat1 = alert.lat + dist_lat_1 / CONVERTION_KM_TO_DEG;
  const lng1 =
    alert.lon + dist_lng_1 / CONVERTION_KM_TO_DEG / Math.cos(latitude);

  // calcul des coordonées en km d'une extrémité du triangle par rapport au centre
  const dist_lat_2 = CAMERA_RANGE_KM * Math.cos(azimuth2);
  const dist_lng_2 = CAMERA_RANGE_KM * Math.sin(azimuth2);

  // calcul des coordonnées en degrés d'une extrémité du triangle
  const lat2 = alert.lat + dist_lat_2 / CONVERTION_KM_TO_DEG;
  const lng2 =
    alert.lon + dist_lng_2 / CONVERTION_KM_TO_DEG / Math.cos(latitude);

  return [
    {lat: lat1, lng: lng1},
    {lat: alert.lat, lng: alert.lon},
    {lat: lat2, lng: lng2},
    {lat: lat1, lng: lng1},
  ];
}

export const alertsService = {
  getAlerts,
  getAlert,
  calculateCoordinatesTriangle,
};
