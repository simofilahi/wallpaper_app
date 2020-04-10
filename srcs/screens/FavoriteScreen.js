import React, {Component} from 'react';
import axios from 'axios';
import DisplayScreen from './DisplayScreen';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import FavoriteHeader from './FavoriteHeader';
import {rooturl, key, method, page, info_level} from '../../config';

export default class FavoriteScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => <FavoriteHeader navigation={navigation} />,
    };
  };

  state = {
    data: [],
    images: [],
    isImageViewVisible: false,
    ServerError: false,
    index: 1,
    isConnected: false,
    isInternetReachable: false,
  };

  updatedata = (newdata) => {
    this.setState({
      data: newdata,
    });
  };

  loadingFunc = (ID, boolean) => {
    this.setState({
      data: this.state.data.map((elem) => {
        if (elem.ID === ID) {
          return {
            ...elem,
            loading: boolean,
          };
        }
        return elem;
      }),
    });
  };

  isImageViewVisibleFunc = (boolean) => {
    this.setState({
      isImageViewVisible: boolean,
    });
  };

  addurl = (url_image, url_thumb) => {
    this.setState(
      {
        images: [
          {
            source: {uri: url_image},
            url_thumb: url_thumb,
            // title: 'Paris',
            width: 806,
            height: 720,
          },
        ],
      },
      () => {
        this.isImageViewVisibleFunc(true);
      },
    );
  };

  callapi = () => {
    return new Promise((resolve, reject) => {
      this.setState({index: this.state.index + 1}, () => {
        const url = `${rooturl}${key}${method}popular${page}${this.state.index}${info_level}2`;
        console.log(url);
        axios
          .get(url)
          .then((res) => {
            const obj = res.data.wallpapers.map((elem, index) => {
              return {...elem, ID: index, loading: true};
            });
            this.setState(
              {
                data: this.state.data.concat(obj),
              },
              () => {
                resolve('yes');
              },
            );
          })
          .catch((err) => {
            this.setState({
              ServerError: true,
            });
            reject('failed');
          });
      });
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected && state.isInternetReachable) {
        this.setState(
          {
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
          },
          async () => {
            let data = await AsyncStorage.getItem('data');
            data = JSON.parse(data);
            this.setState({
              data: data === null ? [] : data,
            });
          },
        );
      } else {
        this.setState({
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
        });
      }
    });
  }

  render() {
    return (
      <>
        <DisplayScreen
          state={this.state}
          isImageViewVisibleFunc={this.isImageViewVisibleFunc}
          loadingFunc={this.loadingFunc}
          addurl={this.addurl}
          callapi={this.callapi}
          updatedata={this.updatedata}
          favoriteFlag={1}
        />
      </>
    );
  }
}
