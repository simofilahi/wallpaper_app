import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import colors from '../../colors/colors';

export class ServerError extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="exclamation-circle"
          type="FontAwesome"
          style={styles.Icon}
        />
        <Text style={styles.text}>
          the server not working we do maintenace, {'\n'} please try a few time
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    fontSize: 60,
    color: colors.white,
  },
  text: {
    marginTop: 20,
    color: colors.white,
  },
});
export default ServerError;
