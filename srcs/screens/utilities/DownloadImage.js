import React, {Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert, ToastAndroid} from 'react-native';
import {PermissionsAndroid} from 'react-native';

const showToast = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

const requestPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App need access to your storage to download Photos.',
          // buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve('Granted');
      } else {
        Alert.alert('Storage Permission Not Granted');
        reject('not Granted');
      }
    } catch (err) {
      reject('something wrong happen');
    }
  });
};

getExtention = (filename) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

const downloadImage = (url) => {
  requestPermission()
    .then((res) => {
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
      showToast('begin Download !');
      config(options)
        .fetch('GET', image_URL)
        .then((res) => {
          showToast('Image Downloaded Successfully');
        });
    })
    .catch((err) => {});
};

export default downloadImage;
