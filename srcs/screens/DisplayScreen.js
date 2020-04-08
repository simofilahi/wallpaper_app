import React, {Component} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewer from './ImageView';
import ServerError from './utilities/ServerError';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

export class DisplayScreen extends Component {
  state = {
    onScroll: false,
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    let flag = 0;
    if (
      !this.props.state.isConnected &&
      !this.props.state.isInternetReachable
    ) {
      flag = 1;
    } else if (this.props.state.ServerError) {
      flag = 2;
    }
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#434343', '#000000']}
        style={styles.linearGradient}>
        {flag === 1 || flag === 2 ? (
          <ServerError flag={flag} />
        ) : (
          <FlatGrid
            itemDimension={100}
            items={this.props.state.data}
            onScroll={(e) => {
              if (this.isCloseToBottom(e.nativeEvent)) {
                this.setState({
                  onScroll: true,
                });
                this.props
                  .callapi()
                  .then(() => {
                    this.setState({
                      onScroll: false,
                    });
                  })
                  .catch((err) => {});
              }
            }}
            spacing={1}
            renderItem={({item, index}) => (
              <View style={styles.itemContainer}>
                {item.loading ? (
                  <>
                    <ActivityIndicator
                      size="small"
                      color="#E84393"
                      style={{alignSelf: 'center'}}
                    />
                    <Image
                      source={{
                        uri: item.url_thumb,
                      }}
                      onLoadEnd={() => {
                        this.props.loadingFunc(item.ID, false);
                      }}
                    />
                  </>
                ) : (
                  <Ripple
                    style={{flex: 1}}
                    onPress={() => {
                      this.props.addurl(item.url_image);
                    }}>
                    <TouchableHighlight style={{flex: 1}}>
                      <Image
                        source={{
                          uri: item.url_thumb,
                        }}
                        style={{height: 250, width: 'auto', flex: 1}}
                      />
                    </TouchableHighlight>
                  </Ripple>
                )}
              </View>
            )}
          />
        )}
        <View>
          <ImageViewer
            images={this.props.state.images}
            isImageViewVisibleFunc={this.props.isImageViewVisibleFunc}
            isImageViewVisible={this.props.state.isImageViewVisible}
          />
        </View>
        {this.state.onScroll && (
          <View
            style={{
              height: 50,
              width: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator
              size="small"
              color="#E84393"
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
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
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 0,
    margin: 2,
    height: 150,
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

export default DisplayScreen;
