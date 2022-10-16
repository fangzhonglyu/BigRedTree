import { StyleSheet, ScrollView, TouchableHighlight, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as React from 'react';

import { updateTree, getUser } from '../network';

// const [pressed, setPressed] = React.useState(false);

// var pressed = false;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  // const onpress = () => { setPressed(true); };

  const [pressed, setPressed] = React.useState(false);
  function thanks() {
    if (pressed) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Thank you for Protecting the Environment</Text>
        </View>
      );
    }
  }

  function getLayout() {
    if (pressed == false)
      return (
        <View style={styles.container}>

          <Text style={styles.title}>Save Power by turning off AC</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>Press the button if you've kept AC off today</Text>
          <Button title="Touch Here" onPress={() => {
            // setPressed(true);
            if (global != null) {
              console.log(global.sub);
              updateTree(global.sub, 0.25).then((d) => {
                getUser(global.sub).then((data) => {
                  console.log('Success:', data);
                  global.treenum = data.treenum;
                })
              });
            }
          }} />
          {/* onPress={() => { pressed = true; }}
        >
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View> */}
          {/* </TouchableHighlight> */}
        </View >
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Thank you for Protecting the Environment</Text>
        </View>
      );
  }


  return (getLayout())
}



const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
