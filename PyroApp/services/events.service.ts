import apiClient from './apiClient.service';

export type Event = {
  id: number;
  created_at: string;
  lat: number;
  lon: number;
  type: string;
  start_ts: string;
  end_ts: string;
  is_acknowledged: string;
};

async function getUnacknowledgedEvents(): Promise<Event[]> {
  const response = await apiClient.get('/events/unacknowledged');
  return response.data;
}

async function getEvents(): Promise<Event[]> {
  const response = await apiClient.get('/events/');
  return response.data;
}

async function acknowledgeEvent(event_id: number): Promise<void> {
  try {
    await apiClient.put(`/events/${event_id}/acknowledge`);
  } catch (error) {
    throw error;
  }
}

export const eventsService = {
  getEvents,
  getUnacknowledgedEvents,
  acknowledgeEvent,
};
