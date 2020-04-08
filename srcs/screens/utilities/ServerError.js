import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import colors from '../../colors/colors';

export class ServerError extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Icon
          name="exclamation-circle"
          type="FontAwesome"
          style={styles.Icon}
        />
        {this.props.flag === 1 && (
          <Text style={styles.text}>Please check your internet</Text>
        )}
        {this.props.flag === 2 && (
          <Text style={styles.text}>
            the server not working we do maintenace, {'\n'} please try a few
            time
          </Text>
        )}
      </ScrollView>
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
