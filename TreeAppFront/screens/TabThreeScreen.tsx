import { StyleSheet, SafeAreaView, Button, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image, Text, View } from 'react-native';
// import { Text, View } from './components/Themed';


export default function TabThreeScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '752731696718-nhibeghj1u04eie23isujls8893l0sfi.apps.googleusercontent.com',
  });

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  let f = false

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      const { authentication } = response;
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
          <Text>{userInfo.id}</Text>
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Button
          title="Sign in"
          onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
        <Button
          disabled={!request || userInfo}
          title="Login"
          onPress={accessToken ? getUserData : () => {
            promptAsync({ showInRecents: true });
            f = true
          }}
        />
        {showUserInfo()}
        {/* <Text style={styles.title}>Me</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabThreeScreen.tsx" /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});