export const COLORS = {
  background_home: '#044545',
  background_button: '#3B71F3',
  background_input: 'white',
  white_text: 'white',
  grey_text: 'grey',
  light_grey: '#D3D3D3',
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
    borderRadius: 5,
  },
  container_button_TERTIARY: {},

  disabled_container: {
    backgroundColor: COLORS.grey_text,
  },

  text_button: {
    fontWeight: 'bold',
    color: COLORS.white_text,
  },
  text_button_Primary: {},
  text_button_TERTIARY: {
    color: COLORS.grey_text,
  },

  disabled_text: {
    color: COLORS.light_grey,
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
  logo_pyronear_big: {
    width: 277,
    height: 57,
  },
  logo_pyronear_small: {
    width: 139,
    height: 29,
  },
  // Link png
  link: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  link_button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  // Error text SignIn
  error_text_signin: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: 'red',
    fontStyle: 'italic',
  },
  // Map View
  map_view: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  // header list
  alerts_list: {
    header: {
      height: 65,
      backgroundColor: COLORS.background_home,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
  },
  // Alert Item
  alert_item: {
    container: {
      padding: 20,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 5,
    },
    circle: {
      height: 30,
      width: 30,
      borderRadius: 15,
      backgroundColor: 'orange',
      marginRight: 15,
    },
  },
  // Image
  scrollView: {
    marginTop: 230,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 5,
    marginBottom: 8,
    borderRadius: 10,
  },
};
