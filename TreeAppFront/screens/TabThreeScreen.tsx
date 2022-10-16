import { StyleSheet, SafeAreaView, Button, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
// import DropDownPicker from 'react-native-dropdown-picker';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image, Pressable, ActionSheetIOS } from 'react-native';

import { postNewUser, getUser } from '../network';
import { useState, useEffect } from "react";

export default function TabThreeScreen({ route, navigation }) {
  const [treenum, setTreenum] = useState(-1);

  const { updateUserData } = route.params;

  useEffect(() => {
    if (updateUserData == true) {
      console.log("updateUserData is true");
      if (userInfo != null && postUser == true) {
        getUser(userInfo.id).then((data) => {
          console.log('Success:', data);
          setUserData(data);
        });
      }
      navigation.setParams({
        updateUserData: false,
      });
    }
  }, [updateUserData]);

  // if (updateUserData == true) {
  //   console.log("updateUserData is true");
  //   if (userInfo != null && postUser == true) {
  //     getUser(userInfo.id).then((data) => {
  //       console.log('Success:', data);
  //       setUserData(data);
  //     });
  //   }
  // } else {
  //   console.log("updateUserData is false");
  // }

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '752731696718-nhibeghj1u04eie23isujls8893l0sfi.apps.googleusercontent.com',
  });

  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [college, setCollege] = React.useState(null);
  const [postUser, setPostUser] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
    }
  }, [response]);

  // React.useEffect(() => {
  //   if (accessToken) {
  //     fetch('https://www.googleapis.com/userinfo/v2/me', {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //       .then(response => response.json())
  //       .then(setUserInfo);
  //   }
  // }, [accessToken]);

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Tab Three</Text>
  //     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //     <EditScreenInfo path="/screens/TabThreeScreen.tsx" />
  //     <Pressable
  //       onPress={() => {
  //         if (!request) {
  //           return;
  //         }

  //         promptAsync();
  //       }}  
  //     >
  //       </View>)



  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function selectCollege() {
    if (college == null) {
      return (<Button title="Select a college"
        onPress={() => ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "College of Agriculture and Life Sciences", "College of Architecture, Art and Planning", "College of Arts and Sciences", "SC Johnson College of Business", "College of Engineering", "College of Human Ecology", "School of Hotel Administration", "School of Industrial and Labor Relations"],
            destructiveButtonIndex: 9,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          },
          buttonIndex => {
            if (buttonIndex === 1) {
              setCollege("CALS");
            } else if (buttonIndex === 2) {
              setCollege("AAP");
            } else if (buttonIndex === 3) {
              setCollege("CAS");
            } else if (buttonIndex === 4) {
              setCollege("Business");
            } else if (buttonIndex === 5) {
              setCollege("COE");
            } else if (buttonIndex === 6) {
              setCollege("CHE");
            } else if (buttonIndex === 7) {
              setCollege("SHA");
            } else if (buttonIndex === 8) {
              setCollege("ILR");
            }
          }
        )}
      />);
    } else {
      if (userInfo != null && postUser == false) {
        postNewUser(userInfo.name, userInfo.id, college)?.then((data) => {
          console.log(userInfo.id);
          setPostUser(true);
          getUser(userInfo.id).then((data) => {
            console.log('Success:', data);
            setUserData(data);
          });
        });
      }
      // useEffect(() => {
      //   if (updateUserData == true) {
      //     console.log("updateUserData is true");
      //     if (userInfo != null && postUser == true) {
      //       getUser(userInfo.id).then((data) => {
      //         console.log('Success:', data);
      //         setUserData(data);
      //       });
      //     }
      //     navigation.setParams({
      //       updateUserData: false,
      //     });
      //   }
      // }, [updateUserData]);

      // if (userInfo != null && postUser == true && userData == null) {
      //   getUser(userInfo.id).then((data) => {
      //     console.log('Success:', data);
      //     setUserData(data);
      //   });
      // }
      if (userData != null) {
        // setTreenum(userData.treenum);
        // navigation.navigate('Root', {
        //   treenum: treenum,
        // });
        global.treenum = userData.treenum;
        return (
          <View style={styles.container}>
            <Text>{college}</Text>
            <Text>{userData.treenum}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Text>{college}</Text>
          </View>
        );
      }
    }
  }

  function updateData() {
    if (userInfo != null && postUser == true) {
      getUser(userInfo.id).then((data) => {
        console.log('Success:', data);
        setUserData(data);
      });
    }
  }


  function showUserInfo() {
    if (userInfo == null && accessToken != null) {
      getUserData();
    }

    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text style={styles.text}>{userInfo.name}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>{userInfo.email}</Text>
          {/* <Text>{userInfo.id}</Text> */}
          {selectCollege()}
        </View>
      );
    }
    else
      return (
        <View style={styles.userInfo}>
          {/* <DropDownPicker
            style={styles.dropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
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
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {/* <Button
          title="Sign in"
          onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
      {showUserInfo()}

      {/* <Text style={styles.title}>Me</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabThreeScreen.tsx" /> */}
    </View>
    // </SafeAreaView>
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