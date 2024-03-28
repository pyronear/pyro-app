import apiClient from './apiClient.service';

async function acknowledgeEvent(event_id: number): Promise<void> {
  try {
    await apiClient.put(`/events/${event_id}/acknowledge`);
  } catch (error) {
    throw error;
  }
}

export const eventsService = {
  acknowledgeEvent,
};
