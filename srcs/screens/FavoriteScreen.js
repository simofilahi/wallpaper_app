import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FavoriteHeader from './FavoriteHeader';

export class FavoriteScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => <FavoriteHeader navigation={navigation} />,
    };
  };
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#434343', '#000000']}
        style={styles.linearGradient}>
        <View>
          <Text> textInComponent </Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});

export default FavoriteScreen;
