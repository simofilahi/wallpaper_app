import React, {Component} from 'react';
import axios from 'axios';
import DisplayScreen from './DisplayScreen';
import NetInfo from '@react-native-community/netinfo';
import {rooturl, key, method, page, info_level} from '../../config';

export default class HomeScreen extends Component {
  state = {
    data: [],
    images: [],
    isImageViewVisible: false,
    ServerError: false,
    index: 1,
    isConnected: false,
    isInternetReachable: false,
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
            width: 1000,
            height: 720,
            url_thumb: url_thumb,
            // title: 'Paris',
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
    this.unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        this.setState(
          {
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
          },
          () => {
            const url = `${rooturl}${key}${method}popular${page}${this.state.index}${info_level}2`;
            console.log(url);
            axios
              .get(url)
              .then((res) => {
                this.setState({
                  data: res.data.wallpapers.map((elem, index) => {
                    return {...elem, ID: index, loading: true};
                  }),
                });
              })
              .catch((err) => {
                this.setState({
                  ServerError: true,
                });
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
          favoriteFlag={0}
        />
      </>
    );
  }
}
