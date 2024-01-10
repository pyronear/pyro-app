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

    console.log('blob');
    await saveToken(response.data.access_token);
    console.log('jai enregistré mon token');
  } catch (error) {
    console.log(error);
    // Handle the error as needed
  }
}

export const authService = {
  getToken,
  removeToken,
  isLogged,
  login,
};
