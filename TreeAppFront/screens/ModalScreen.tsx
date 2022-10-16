import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.first}> </Text>
      <Text style={styles.thankyou}>Thank you!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}
      <Text style={styles.title}>for Protecting the Environment</Text>
      <Text>  </Text>
      <Text>  </Text>
      <Text> Created by Xilai Dai, Barry Lyu, Stephanie Ma, Yanny Zhu  </Text>
      <Text>  </Text>
      <Text> during Big Red Hack Weekend! </Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  thankyou: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  first: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
});
