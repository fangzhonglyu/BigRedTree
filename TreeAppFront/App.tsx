import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
// import { Text, View } from './components/Themed';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: '752731696718-nhibeghj1u04eie23isujls8893l0sfi.apps.googleusercontent.com',
  // });

  // const [accessToken, setAccessToken] = React.useState();
  // const [userInfo, setUserInfo] = React.useState();

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     setAccessToken(response.authentication.accessToken);
  //     const { authentication } = response;
  //   }
  // }, [response]);

  // async function getUserData() {
  //   let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   });

  //   userInfoResponse.json().then(data => {
  //     setUserInfo(data);
  //   });
  // }

  // function showUserInfo() {
  //   if (userInfo) {
  //     return (
  //       <View style={styles.userInfo}>
  //         <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
  //         <Text>Welcome {userInfo.name}</Text>
  //         <Text>{userInfo.email}</Text>
  //         <Text>{userInfo.id}</Text>
  //       </View>
  //     );
  //   }
  // }


  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {/* <Text>Welcome</Text> */}
        {/* {showUserInfo()} */}
        <StatusBar />
        {/* <Button
          disabled={!request}
          title="Login"
          onPress={accessToken ? getUserData : () => {
            promptAsync({ showInRecents: true });
          }}
        /> */}
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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