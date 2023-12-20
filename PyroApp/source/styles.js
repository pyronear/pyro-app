export const COLORS = {
    background_home: '#F9FBFC',
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
    },
    // Button
    container_button: {
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    container_button_PRIMARY: {
        backgroundColor: COLORS.background_button,
    },
    container_button_TERTIARY: {},

    text_button: {
        fontWeight: 'bold',
        color: COLORS.white_text,
    },
    text_button_Primary:{},
    text_button_TERTIARY: {
        color: COLORS.grey_text,
    },
    // Input
    container_input: {
        backgroundcolor: COLORS.background_input,
        width: '100%',

        borderColor: COLORS.border_input,
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
  };