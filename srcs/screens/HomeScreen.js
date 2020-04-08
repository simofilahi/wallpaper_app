import React, {Component} from 'react';
import axios from 'axios';
import DisplayScreen from './DisplayScreen';
import {rooturl, key, method, page, info_level} from '../../config';

export default class HomeScreen extends Component {
  state = {
    data: [],
    images: [],
    isImageViewVisible: false,
    ServerError: false,
    index: 1,
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

  addurl = (url) => {
    this.setState(
      {
        images: [
          {
            source: {uri: url},
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
              console.log('data***************** ==> ', this.state.data);
              // this.state.data.map((elem) => {
              //   console.log('elem ==> ', elem);
              // });
            },
          );
        })
        .catch((err) => {
          this.setState({
            ServerError: true,
          });
        });
    });
  };

  componentDidMount() {
    const url = `${rooturl}${key}${method}popular${page}${this.state.index}${info_level}2`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        this.setState(
          {
            data: res.data.wallpapers.map((elem, index) => {
              return {...elem, ID: index, loading: true};
            }),
          },
          () => {
            console.log('data first ==> ', this.state.data);
          },
        );
      })
      .catch((err) => {
        this.setState({
          ServerError: true,
        });
      });
  }

  render() {
    // this.state.data.map((elem) => {
    //   console.log('elem ==> ', elem);
    // });

    return (
      <>
        <DisplayScreen
          state={this.state}
          isImageViewVisibleFunc={this.isImageViewVisibleFunc}
          loadingFunc={this.loadingFunc}
          addurl={this.addurl}
          callapi={this.callapi}
        />
      </>
    );
  }
}
