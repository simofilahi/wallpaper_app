import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Content, Button} from 'native-base';
import axios from 'axios';
import {rooturl, key} from '../../config';
import colors from '../colors/colors';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import ImageView from 'react-native-image-view';
import {Overlay} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';

export default class AnimalScreen extends Component {
  state = {
    data: [],
    images: [],
    loading: true,
    isImageViewVisible: false,
  };

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'ReactNativeCode Storage Permission',
          message:
            'ReactNativeCode App needs access to your storage to download Photos.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        Alert.alert('Storage Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {
    // const url =
    //   'https://wall.alphacoders.com/api2.0/get.php?auth=745f100ac174914fd2730fe2ea0b6b45&method=popular&page=1&info_level=2';
    // console.log(url);
    // axios
    //   .get(url)
    //   .then((res) => {
    //     this.setState({
    //       data: res.data.wallpapers,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  downloadImage = (url) => {
    this.requestPermission();
    var date = new Date();
    var image_URL = url;
    console.log({image_URL: image_URL});
    var ext = this.getExtention(image_URL);
    console.log({ext: ext});
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;

    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        Alert.alert('Image Downloaded Successfully.');
      });
  };

  render() {
    this.state.data.map((elem) => {
      console.log('elem ==> ', elem);
    });

    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#434343', '#000000']}
        style={styles.linearGradient}>
        <FlatGrid
          itemDimension={160}
          items={this.state.data}
          // style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={6}
          renderItem={({item, index}) => (
            <View style={[styles.itemContainer]}>
              {this.state.loading && (
                <ActivityIndicator size="small" color="#00ff00" />
              )}
              <TouchableHighlight
                style={{flex: 1}}
                onPress={() =>
                  this.setState(
                    {
                      isImageViewVisible: !this.state.isImageViewVisible,
                      images: [
                        {
                          source: {uri: item.url_image},
                          title: 'Paris',
                          width: 806,
                          height: 720,
                        },
                      ],
                    },
                    () => {
                      console.log('state ==> ', this.state.images[0].source);
                    },
                  )
                }>
                <Image
                  source={{
                    uri: item.url_image,
                  }}
                  resizeMode={'contain'}
                  onLoadStart={() => this.setState({loading: true})}
                  onLoadEnd={() => {
                    this.setState({loading: false});
                  }}
                  style={{height: 500, width: 'auto', flex: 1}}
                />
              </TouchableHighlight>
            </View>
          )}
        />
        <ImageView
          onClose={() => {
            this.setState({isImageViewVisible: false});
          }}
          animationType="slide"
          images={this.state.images}
          imageIndex={0}
          isVisible={this.state.isImageViewVisible}
          renderFooter={(currentImage) => (
            <View style={{flex: 1, backgroundColor: 'red', height: 150}}>
              <View style={{flex: 1, backgroundColor: 'green'}}>
                <Button
                  onPress={() => {
                    this.downloadImage(this.state.images[0].source.uri);
                  }}>
                  <Text>Download</Text>
                </Button>
              </View>
              <View style={{flex: 1, backgroundColor: 'blue'}}></View>
            </View>
          )}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: 'tomato',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
