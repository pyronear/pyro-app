/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {TextInput, Button} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Try editing me! 🎉</Text>
      </View> */}
      <Text>Hello world 🎉</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const Authentification = () => {
  const [isdeconnected, setIsdeconnected] = useState(true);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
        }}>
        Authentification Page
      </Text>
      <Text
        style={{
          textAlign: "center",
        }}>
        Login
      </Text>
      <TextInput
        style={{
          height: 40,
          textAlign: "center",
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue=""
      />
      <Text
        style={{
          textAlign: "center",
        }}>
        Password
      </Text>
      <TextInput
        style={{
          height: 40,
          textAlign: "center",
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue=""
      />
      <Button
        onPress={() => {
          setIsdeconnected(false);
        }}
        disabled={!isdeconnected}
        title={isdeconnected ? 'Connexion' : 'Connexion'}
      />
    </View>
  );
};

export default Authentification;

// export default App;
