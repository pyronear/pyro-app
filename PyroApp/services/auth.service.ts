import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const authService = {
  saveToken,
  getToken,
  removeToken,
  isLogged,
};
