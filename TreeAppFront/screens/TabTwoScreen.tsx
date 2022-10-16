import { StyleSheet, Alert, SafeAreaView, Dimensions, ScrollView } from 'react-native';
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



    const ox = (www - 350) / 2; //offset x
    const oy = 200; //offset y
    const imgx = 70; // image size x
    const imgy = 44; // image size y
    const ix = 35; // imterval x
    const iy = 18.2; // interval y
    const fth = 65; // full tree height
    const ftw = 50; // full tree width
    const nth = 30;
    const ntw = 15;
    const yth = 48;
    const ytw = 30;
    const mth = 60;
    const mtw = 36;

    const raw_tree_num = 10.78
    const full_tree_num = Math.floor(raw_tree_num); // number of trees
    const partial_tree_num = raw_tree_num - full_tree_num; // number of partial trees

    const img_tile = new CanvasImage(canvas);
    const img_full_tree_1 = new CanvasImage(canvas);
    const img_full_tree_2 = new CanvasImage(canvas);
    const img_new_tree_1 = new CanvasImage(canvas);
    const img_new_tree_2 = new CanvasImage(canvas);
    const img_young_tree_1 = new CanvasImage(canvas);
    const img_young_tree_2 = new CanvasImage(canvas);
    const img_mid_tree_1 = new CanvasImage(canvas);
    const img_mid_tree_2 = new CanvasImage(canvas);
    // img_full_tree_1.src = 'https://cdn.atcg.cc/full-tree-1.png';

    // // img_new_tree_1.src = 'https://cdn.atcg.cc/new-tree-1.png';
    // img_new_tree_2.src = 'https://cdn.atcg.cc/new-tree-2.png';
    // // img_young_tree_1.src = 'https://cdn.atcg.cc/young-tree-1.png';
    // img_young_tree_2.src = 'https://cdn.atcg.cc/young-tree-2.png';
    // // img_mid_tree_1.src = 'https://cdn.atcg.cc/mid-tree-1.png';
    // img_mid_tree_2.src = 'https://cdn.atcg.cc/mid-tree-2.png';

    img_tile.addEventListener('load', () => {
      // for (let i = 6; i >= 0; i++) {
      //   for (let j = 0; j <= i; j++) {
      //     let pad = (8 / 2 - i)
      //     let x = ox + (2 * j + pad) * ix;
      //     let y = canvas.height - (oy + (i) * iy);
      //     ctx.drawImage(img_tile, x, y, imgx, imgy);
      //   }
      // }
      // for (let i = 39; i >= 0; i++) {
      //   for (let j = 0; j <= 6; j++) {
      //     let x = ox + (2 * j - (i % 2) - 1) * ix;
      //     let y = canvas.height - (oy + (7 + i) * iy);
      //     ctx.drawImage(img_tile, x, y, imgx, imgy);
      //   }
      // }
      ctx.drawImage(img_tile, ox + 4 * ix, oy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 3 * ix, oy + iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 5 * ix, oy + iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 2 * ix, oy + 2 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 4 * ix, oy + 2 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 6 * ix, oy + 2 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + ix, oy + 3 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 3 * ix, oy + 3 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 5 * ix, oy + 3 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 7 * ix, oy + 3 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox, oy + 4 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 2 * ix, oy + 4 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 4 * ix, oy + 4 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 6 * ix, oy + 4 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 8 * ix, oy + 4 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + ix, oy + 5 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 3 * ix, oy + 5 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 5 * ix, oy + 5 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 7 * ix, oy + 5 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 2 * ix, oy + 6 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 4 * ix, oy + 6 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 6 * ix, oy + 6 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 3 * ix, oy + 7 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 5 * ix, oy + 7 * iy, imgx, imgy);
      ctx.drawImage(img_tile, ox + 4 * ix, oy + 8 * iy, imgx, imgy);
      img_full_tree_2.src = 'https://cdn.atcg.cc/full-tree-2.png';
      img_full_tree_2.addEventListener('load', () => {
        const hasPartialTree = partial_tree_num > Number.EPSILON;
        var total_tree_num = full_tree_num;
        if (hasPartialTree) {
          total_tree_num += 1;
        }
        var tree_x_raw: number[] = new Array(total_tree_num);
        var tree_y_raw: number[] = new Array(total_tree_num);


        const tree_interval_raw = 49;
        for (let i = 0; i < full_tree_num; i++) {
          let x = i % 5;
          let y = Math.floor(i / 5);
          tree_x_raw[i] = x * tree_interval_raw;
          tree_y_raw[i] = y * tree_interval_raw;
        }
        if (hasPartialTree) {
          tree_x_raw[full_tree_num] = full_tree_num % 5 * tree_interval_raw;
          tree_y_raw[full_tree_num] = Math.floor(full_tree_num / 5) * tree_interval_raw;
        }
        const m00 = 0.707107;
        const m01 = -0.707107;
        const m10 = 0.38500;
        const m11 = 0.38500;
        // const m00 = 0.707;
        // const m01 = 0.707;
        // const m10 = -0.707
        // const m11 = 0.707;
        for (let i = 0; i < full_tree_num; i++) {
          let rw = ftw + 20 * (Math.random() - 0.5);
          let rh = fth + 25 * (Math.random() - 0.5);
          let x = ox + 4 + 5 * ix - rw / 2 + m00 * tree_x_raw[i] + m01 * tree_y_raw[i];
          let y = oy + 5 + iy - rh + m10 * tree_x_raw[i] + m11 * tree_y_raw[i];
          ctx.drawImage(img_full_tree_2, x, y, rw, rh);
        }

        if (hasPartialTree) {
          if (partial_tree_num < 0.3) {
            img_new_tree_2.src = 'https://cdn.atcg.cc/new-tree-2.png';
          } else if (partial_tree_num < 0.7) {
            img_young_tree_2.src = 'https://cdn.atcg.cc/young-tree-2.png';
          } else {
            img_mid_tree_2.src = 'https://cdn.atcg.cc/mid-tree-2.png';
          }

          if (partial_tree_num < 0.3) {
            img_new_tree_2.addEventListener('load', () => {
              let rw = ntw + 4 * (Math.random() - 0.5);
              let rh = nth + 8 * (Math.random() - 0.5);
              let x = ox + 2 + 5 * ix - rw / 2 + m00 * tree_x_raw[full_tree_num] + m01 * tree_y_raw[full_tree_num];
              let y = oy + 4 + iy - rh + m10 * tree_x_raw[full_tree_num] + m11 * tree_y_raw[full_tree_num];
              ctx.drawImage(img_new_tree_2, x, y, rw, rh);
            });
          } else if (partial_tree_num < 0.7) {
            img_young_tree_2.addEventListener('load', () => {
              let rw = ytw + 4 * (Math.random() - 0.5);
              let rh = yth + 8 * (Math.random() - 0.5);
              let x = ox + 4 + 5 * ix - rw / 2 + m00 * tree_x_raw[full_tree_num] + m01 * tree_y_raw[full_tree_num];
              let y = oy + 5 + iy - rh + m10 * tree_x_raw[full_tree_num] + m11 * tree_y_raw[full_tree_num];
              ctx.drawImage(img_young_tree_2, x, y, rw, rh);

            });
          } else {
            img_mid_tree_2.addEventListener('load', () => {
              let rw = mtw + 8 * (Math.random() - 0.5);
              let rh = mth + 16 * (Math.random() - 0.5);
              let x = ox + 4 + 5 * ix - rw / 2 + m00 * tree_x_raw[full_tree_num] + m01 * tree_y_raw[full_tree_num];
              let y = oy + 5 + iy - rh + m10 * tree_x_raw[full_tree_num] + m11 * tree_y_raw[full_tree_num];
              ctx.drawImage(img_mid_tree_2, x, y, rw, rh);
            });
          }
        }
      });
    });
    img_tile.src = 'https://cdn.atcg.cc/tile.png';
    // ctx.drawImage(img, 10, 10, 1000, 1000);
    // img.onload = () => {
    //   ctx.drawImage(img, 10, 10, 1000, 1000);
    // }
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
    pinchGestureEnabled: true,
    maximumZoomScale: 2,
    showsVerticalScrollIndicator: false,
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
