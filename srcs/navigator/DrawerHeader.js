import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView, StyleSheet, ImageBackground} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';

const image = require('../assests/img.jpg');

const CustomDrawerContentComponent = (props) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#434343', '#000000']}
    style={styles.linearGradient}>
    {/* <ImageBackground source={image} style={styles.image}> */}
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
    {/* </ImageBackground> */}
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  gridView: {
    flex: 1,
    height: 100,
    backgroundColor: 'blue',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default CustomDrawerContentComponent;
