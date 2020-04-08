import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../colors/colors';
import Ripple from 'react-native-material-ripple';

class FavoriteHeader extends Component {
  componentDidMount() {
    console.log('props ==> ', this.props.navigation);
    // alert('yoyooyoyoyo ********');
  }
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#000000', '#E84393']}
        style={styles.linearGradient}>
        <StatusBar backgroundColor="black" />
        <View style={styles.menuIcon}>
          <Ripple
            rippleContainerBorderRadius={200}
            rippleCentered={true}
            rippleFades={false}
            onPress={() => {
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 300);
            }}>
            <TouchableOpacity style={styles.button}>
              <Icon name="md-arrow-back" type="Ionicons" style={styles.Icon} />
            </TouchableOpacity>
          </Ripple>
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>Favorites</Text>
        </View>
        <View style={styles.settingIcon}>
          <Ripple
            rippleContainerBorderRadius={200}
            rippleCentered={true}
            rippleFades={false}
            onPress={() => {
              setTimeout(() => {
                this.props.navigation.navigate('Favorite');
              }, 300);
            }}>
            <TouchableOpacity style={styles.button}>
              <Icon name="more-vertical" type="Feather" style={styles.Icon} />
            </TouchableOpacity>
          </Ripple>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    height: 58,
    width: '100%',
    borderBottomWidth: 1.5,
    elevation: 0,
  },
  container: {
    flex: 1,
  },
  menuIcon: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'normal',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  Icon: {
    color: colors.white,
    fontSize: 24,
  },
});

export default FavoriteHeader;
