import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'native-base';
import {DrawerItems} from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';

const CustomDrawerContentComponent = (props) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#434343', '#000000']}
    style={styles.linearGradient}>
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
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
  container: {
    flex: 1,
  },
});

export default CustomDrawerContentComponent;
