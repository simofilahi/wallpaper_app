import React, {Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native';

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

getExtention = (filename) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

const downloadImage = (url) => {
  requestPermission();
  var date = new Date();
  var image_URL = url;
  console.log({image_URL: image_URL});
  var ext = getExtention(image_URL);
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

export default downloadImage;
