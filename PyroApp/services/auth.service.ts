import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient.service';

async function saveToken(token: string): Promise<void> {
  await AsyncStorage.setItem('token', token);
}

async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem('token');
}

async function removeToken(): Promise<void> {
  await AsyncStorage.removeItem('token');
}

async function isLogged(): Promise<boolean> {
  var token = await AsyncStorage.getItem('token');
  return !!token;
}

async function login(username: string, password: string) {
  try {
    const response = await apiClient.post(
      '/login/access-token',
      {
        username: username,
        password: password,
      },
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      },
    );

    await saveToken(response.data.access_token);
  } catch (error) {
    throw error;
  }
}

export const authService = {
  getToken,
  removeToken,
  isLogged,
  login,
};
