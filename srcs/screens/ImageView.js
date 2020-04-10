import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'native-base';
import ImageView from 'react-native-image-view';
import downloadImage from './utilities/DownloadImage';
import colors from '../colors/colors';
import AsyncStorage from '@react-native-community/async-storage';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob';

export default class ImageViewer extends Component {
  state = {
    ICON: () => {
      return (
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Icon name="heart" type="FontAwesome" style={styles.Icon} />
        </TouchableOpacity>
      );
    },
  };

  urlCmp = (url_image) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await AsyncStorage.getItem('data');
        data = JSON.parse(data);
        if (data !== null && data !== undefined) {
          data.forEach((element) => {
            if (element.url_image !== undefined && element.url_image !== null) {
              if (element.url_image === url_image) resolve(true);
            }
          });
        }
        reject(false);
      } catch {
        reject(false);
      }
    });
  };

  storeUrls = async (url_image, url_thumb) => {
    let flag = 0;
    let data = await AsyncStorage.getItem('data');

    data = JSON.parse(data);
    if (data === null || data === undefined) {
      data = [{url_image, url_thumb}];
    } else {
      data = data.filter((elem) => {
        if (elem.url_image !== url_image) {
          return true;
        } else flag = 1;
      });
      if (flag === 0) data = [...data, {url_image, url_thumb}];
    }
    if (this.props.favoriteFlag === 1) this.props.updatedata(data);
    data = JSON.stringify(data);
    const ret = await AsyncStorage.setItem('data', data);
    if (flag === 1) {
      this.setState({
        ICON: (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.storeUrls(
                this.props.images[0].source.uri,
                this.props.images[0].url_thumb,
              );
            }}>
            <Icon name="heart" type="FontAwesome" style={styles.Icon} />
          </TouchableOpacity>
        ),
      });
    } else {
      this.setState({
        ICON: (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.storeUrls(
                this.props.images[0].source.uri,
                this.props.images[0].url_thumb,
              );
            }}>
            <Icon name="heart" type="FontAwesome" style={styles.Icon_1} />
          </TouchableOpacity>
        ),
      });
    }
  };

  componentDidMount() {
    console.log('here ==> ', this.props.images);
    if (
      this.props.images !== null &&
      this.props.images !== undefined &&
      this.props.images.length > 0 &&
      this.props.images[0].source !== null &&
      this.props.images[0].source !== undefined &&
      this.props.images[0].url_thumb !== undefined &&
      this.props.images[0].url_thumb !== null
    ) {
      this.urlCmp(this.props.images[0].source.uri)
        .then((res) => {
          this.setState({
            ICON: (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.storeUrls(
                    this.props.images[0].source.uri,
                    this.props.images[0].url_thumb,
                  );
                }}>
                <Icon name="heart" type="FontAwesome" style={styles.Icon_1} />
              </TouchableOpacity>
            ),
          });
        })
        .catch((err) => {
          this.setState({
            ICON: (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.storeUrls(
                    this.props.images[0].source.uri,
                    this.props.images[0].url_thumb,
                  );
                }}>
                <Icon name="heart" type="FontAwesome" style={styles.Icon} />
              </TouchableOpacity>
            ),
          });
        });
    }
  }

  render() {
    return (
      <ImageView
        onClose={() => {
          this.props.isImageViewVisibleFunc(false);
        }}
        animationType="slide"
        glideAlways={true}
        images={this.props.images}
        // imageIndex={0}
        isVisible={this.props.isImageViewVisible}
        renderFooter={(currentImage) => (
          <View style={styles.container}>
            <View style={styles.wrapper}>
              {/* <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-2078580912080341/8708347349"
                onAdFailedToLoad={(error) => console.error({error: error})}
              /> */}
              <View style={styles.item_1}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.storeUrls(
                      this.props.images[0].source.uri,
                      this.props.images[0].url_thumb,
                    );
                  }}>
                  {this.state.ICON}
                </TouchableOpacity>
                <Text style={styles.text}>Favorite</Text>
              </View>
              <View style={styles.item_2}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    downloadImage(this.props.images[0].source.uri);
                  }}>
                  <Icon name="download" type="Feather" style={styles.Icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Download</Text>
              </View>
            </View>
            <View style={styles.wrapper_2}>
              {/* <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-2078580912080341/8708347349"
                onAdFailedToLoad={(error) => console.error({error: error})}
              /> */}
            </View>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wrapper_2: {
    flex: 1,
  },
  item_1: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_2: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  Icon_1: {
    color: 'red',
    fontSize: 24,
  },
  text: {
    color: colors.white,
  },
});
