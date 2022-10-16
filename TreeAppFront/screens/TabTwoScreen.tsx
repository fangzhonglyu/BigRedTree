import { StyleSheet, Alert, SafeAreaView } from 'react-native';
import React, { useRef } from 'react';
import { Asset } from 'expo-asset';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import { useState, useEffect } from "react";


export default function TabTwoScreen({ route, navigation }) {
  // const asset = Asset.fromModule(require('../assets/images/full-tree-1.png'));

  const { updateTreenum } = route.params;
  // const [treenum_, setTreenum_] = React.useState(-1);
  // setTreenum_(10);

  // useEffect(() => {
  //   if (updateTreenum == true) {
  //     setTreenum_(global.treenum);
  //     navigation.setParams({
  //       updateTreenum: false,
  //     });
  //   }
  // }, [updateTreenum]);

  // if (global.treenum != null) {
  //   console.log(global.treenum);
  //   // setTreenum_(global.treenum);
  // }

  const handleCanvas = (canvas) => {
    if (canvas != null) {
      global.cvs = canvas;
    }
    canvas = global.cvs;
    const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, 100, 100);


    const img = new CanvasImage(canvas);
    img.src = 'https://cdn.atcg.cc/full-tree-1.png';
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 100, 100);
    });
  };

  function treenumber() {
    if (global.treenum != null) {
      return (
        <Text style={styles.title}>{global.treenum}</Text>
      );
    }
    // return (<Text> t </Text>);
  }

  return (
    // <Canvas ref={handleCanvas} style={{ width: '100%', height: '100%' }} />
    <View style={styles.container}>
      <Text >Tab Two</Text>
      {treenumber()}
      <Canvas ref={handleCanvas} style={{ width: '100%', height: '100%' }} />
      {/* <View style={styles.separator}s lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
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
