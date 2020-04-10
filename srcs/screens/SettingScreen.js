import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {ListItem, Text, Icon, Left, Body, Right} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SettingHeader from './SettingHeader';
import colors from '../colors/colors';
import Ripple from 'react-native-material-ripple';
import Share from 'react-native-share';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Wallpaper';
const message = 'Hey! check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  ios: {
    activityItemSources: [
      {
        // For sharing url with custom title.
        placeholderItem: {type: 'url', content: url},
        item: {
          default: {type: 'url', content: url},
        },
        subject: {
          default: title,
        },
        linkMetadata: {originalUrl: url, url, title},
      },
      {
        // For sharing text.
        placeholderItem: {type: 'text', content: message},
        item: {
          default: {type: 'text', content: message},
          message: null, // Specify no text to share via Messages app.
        },
        linkMetadata: {
          // For showing app icon on share preview.
          title: message,
        },
      },
      {
        // For using custom icon instead of default text icon at share preview when sharing with message.
        placeholderItem: {
          type: 'url',
          content: icon,
        },
        item: {
          default: {
            type: 'text',
            content: `${message} ${url}`,
          },
        },
        linkMetadata: {
          title: message,
          icon: icon,
        },
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: () => <SettingHeader navigation={navigation} />,
    };
  };
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#434343', '#000000']}
        style={styles.linearGradient}>
        <ScrollView style={styles.container}>
          <Ripple
            style={styles.ripple}
            onPress={() => {
              alert('yes');
              Share.open(options);
            }}>
            <ListItem icon>
              <Left>
                <Icon name="share" style={styles.icon} />
              </Left>
              <Body>
                <Text style={styles.text}>Share</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Ripple>
          <Ripple style={styles.ripple}>
            <ListItem icon>
              <Left>
                <Icon name="feedback" />
              </Left>
              <Body>
                <Text style={styles.text}>Feedback</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Ripple>
          <Ripple style={styles.ripple}>
            <ListItem icon>
              <Left>
                <Icon name="sync" type="FontAwesome5" style={styles.icon} />
              </Left>
              <Body>
                <Text style={styles.text}>Clear cache</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Ripple>
          <Ripple style={styles.ripple}>
            <ListItem icon>
              <Left>
                <Icon name="about" type="FontAwesome5" />
              </Left>
              <Body>
                <Text style={styles.text}>Version</Text>
              </Body>
            </ListItem>
          </Ripple>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    paddingLeft: 10,
  },
  ripple: {
    paddingTop: 10,
    justifyContent: 'center',
  },
  icon: {
    color: colors.white,
  },
});

export default SettingScreen;
