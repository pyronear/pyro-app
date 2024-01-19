export const COLORS = {
  background_home: '#044545',
  background_button: '#3B71F3',
  background_input: 'white',
  white_text: 'white',
  grey_text: 'grey',
  border_input: '#e8e8e8',
  // Ajoutez d'autres couleurs si nécessaire
};

export const STYLES = {
  // App.tsx
  root: {
    flex: 1,
    backgroundColor: COLORS.background_home,
    justifyContent: 'center',
  },
  signin_input: {
    backgroundColor: '#F7FAFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  // Button
  container_button: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
  },
  container_button_PRIMARY: {
    backgroundColor: COLORS.background_home,
  },
  container_button_TERTIARY: {},

  text_button: {
    fontWeight: 'bold',
    color: COLORS.white_text,
  },
  text_button_Primary: {},
  text_button_TERTIARY: {
    color: COLORS.grey_text,
  },
  // Input
  input: {
    height: 40,
    margin: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    padding: 10,
  },
  // Logo Pyronear
  logo_pyronear: {
    width: 277,
    height: 57,
  },
};
