import { StyleSheet, SafeAreaView, Button, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import DropDownPicker from 'react-native-dropdown-picker';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image, Pressable, ActionSheetIOS } from 'react-native';


export default function TabThreeScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '752731696718-nhibeghj1u04eie23isujls8893l0sfi.apps.googleusercontent.com',
  });

  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: 'College of Agriculture and Life Sciences', value: 'CALS' },
    { label: 'College of Architecture, Art and Planning', value: 'CAAP' },
    { label: 'College of Arts and Sciences', value: 'CAS' },
    { label: 'Ann S. Bowers College of Computing and information science', value: 'COB' },
    { label: 'SC Johnson College of Business', value: 'CBA' },
    { label: 'College of Engineering', value: 'COE' },
    { label: 'College of Human Ecology', value: 'CHE' },
    { label: 'School of Hotel Administration', value: 'SHA' },
    { label: 'School of Industrial and Labor Relations', value: 'ILR' },
  ]);

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
          <Text style={styles.text}>{userInfo.name}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>{userInfo.email}</Text>
          <Text>{userInfo.id}</Text>
        </View>
      );
    }
    else
      return (
        <View style={styles.userInfo}>
          <DropDownPicker
            style={styles.dropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Button
            title='Sign in with Google'
            disabled={!request || userInfo}
            onPress={accessToken ? getUserData : () => {
              promptAsync({ showInRecents: true });
            }}
          />
        </View>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Button
          title="Sign in"
          onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
        {showUserInfo()}

        {/* <Text style={styles.title}>Me</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabThreeScreen.tsx" /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    width: 300,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    paddingVertical: 15
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 5,
    elevation: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'stretch',
    marginTop: 50,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '180%',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginTop: 50,
    marginHorizontal: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 5,
  }
});