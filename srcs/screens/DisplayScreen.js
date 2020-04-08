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
import {ScrollView} from 'react-native-gesture-handler';

export class DisplayScreen extends Component {
  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#434343', '#000000']}
        style={styles.linearGradient}>
        {this.props.state.ServerError ? (
          <ServerError />
        ) : (
          <FlatGrid
            itemDimension={100}
            items={this.props.state.data}
            onScroll={(e) => {
              if (this.isCloseToBottom(e.nativeEvent)) {
                this.props.callapi();
              }
            }}
            // style={styles.gridView}
            // staticDimension={300}
            // fixed
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
                        // alert('yes');
                        //   this.setState({loading: false});
                        this.props.loadingFunc(item.ID, false);
                      }}
                    />
                  </>
                ) : (
                  <TouchableHighlight
                    style={{flex: 1}}
                    onPress={() => this.props.addurl(item.url_image)}>
                    <Image
                      source={{
                        uri: item.url_thumb,
                      }}
                      //   onLoadEnd={() => {
                      //     // alert('yes');
                      //     //   this.setState({loading: false});
                      //     this.props.loadingFunc(item.ID, false);
                      //   }}
                      style={{height: 250, width: 'auto', flex: 1}}
                    />
                  </TouchableHighlight>
                )}
              </View>
            )}
          />
        )}
        <ImageViewer
          images={this.props.state.images}
          isImageViewVisibleFunc={this.props.isImageViewVisibleFunc}
          isImageViewVisible={this.props.state.isImageViewVisible}
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
