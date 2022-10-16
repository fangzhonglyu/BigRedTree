import { StyleSheet, Alert, SafeAreaView } from 'react-native';
import React, { useRef } from 'react';
import { Asset } from 'expo-asset';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';



export default function TabTwoScreen() {
  // const asset = Asset.fromModule(require('../assets/images/full-tree-1.png'));

  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, 100, 100);


    const img = new CanvasImage(canvas);
    img.src = 'https://cdn.atcg.cc/full-tree-1.png';
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 100, 100);
    });
    // ctx.drawImage(img, 10, 10, 1000, 1000);
    // img.onload = () => {
    //   ctx.drawImage(img, 10, 10, 1000, 1000);
    // }
  };

  return (
    // <Canvas ref={handleCanvas} style={{ width: '100%', height: '100%' }} />
    <View style={styles.container}>
      <Text >Tab Two</Text>
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
