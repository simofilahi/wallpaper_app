import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'native-base';
import ImageView from 'react-native-image-view';
import downloadImage from './utilities/DownloadImage';
import colors from '../colors/colors';

export default class ImageViewer extends Component {
  render() {
    return (
      <ImageView
        onClose={() => {
          this.props.isImageViewVisibleFunc(false);
        }}
        animationType="slide"
        images={this.props.images}
        imageIndex={0}
        isVisible={this.props.isImageViewVisible}
        renderFooter={(currentImage) => (
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.item_1}>
                <TouchableOpacity style={styles.button}>
                  <Icon name="hearto" type="AntDesign" style={styles.Icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Favorite</Text>
              </View>
              <View style={styles.item_2}>
                <TouchableOpacity style={styles.button}>
                  <Icon name="download" type="Feather" style={styles.Icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Download</Text>
              </View>
            </View>
            <View style={styles.wrapper_2}></View>
          </View>
        )}
      />
    );
  }
}

// onPress={() => {
//     downloadImage(this.props.images[0].source.uri);
//   }}

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
  text: {
    color: colors.white,
  },
});
