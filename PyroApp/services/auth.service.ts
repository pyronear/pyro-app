import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveToken(token: string) {
  await AsyncStorage.setItem('token', token);
}

async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem('token');
}

export const authService = {
  saveToken,
  getToken,
};
