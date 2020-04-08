import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {rooturl, key} from '../../config';
import colors from '../colors/colors';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewer from './ImageView';
import ServerError from './utilities/ServerError';

export default class HomeScreen extends Component {
  state = {
    data: [],
    images: [],
    loading: true,
    isImageViewVisible: false,
    ServerError: false,
  };

  isImageViewVisibleFunc = (boolean) => {
    this.setState({
      isImageViewVisible: boolean,
    });
  };

  componentDidMount() {
    const url =
      'htt://wall.alphacoders.com/api2.0/get.php?auth=745f100ac174914fd2730fe2ea0b6b45&method=popular&page=1&info_level=2';
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        this.setState({
          data: res.data.wallpapers,
        });
      })
      .catch((err) => {
        this.setState({
          ServerError: true,
        });
      });
  }

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
        {this.state.ServerError ? (
          <ServerError />
        ) : (
          <FlatGrid
            itemDimension={100}
            items={this.state.data}
            // style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={1}
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
                        this.isImageViewVisibleFunc(true);
                      },
                    )
                  }>
                  <Image
                    source={{
                      uri: item.url_thumb,
                    }}
                    // resizeMode={'contain'}
                    // onLoadStart={() => {
                    //   this.setState({loading: true});
                    // }}
                    onLoadEnd={() => {
                      // alert('yes');
                      this.setState({loading: false});
                    }}
                    style={{height: 250, width: 'auto', flex: 1}}
                  />
                </TouchableHighlight>
              </View>
            )}
          />
        )}
        <ImageViewer
          images={this.state.images}
          isImageViewVisibleFunc={this.isImageViewVisibleFunc}
          isImageViewVisible={this.state.isImageViewVisible}
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
    padding: 2,
    height: 150,
    borderEndWidth: 1,
    // backgroundColor: 'tomato',
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
