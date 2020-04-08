import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AbstractScreen from '../screens/AbstractScreen';
import AnimalScreen from '../screens/AnimalScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CustomDrawerContentComponent from './DrawerHeader';
import IndexHeader from '../screens/IndexHeader';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Popular: {
      screen: HomeScreen,
    },
    Abstract: {
      screen: AbstractScreen,
    },
    Animal: {
      screen: AnimalScreen,
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
    navigationOptions: {
      header: (navigation) => (
        <IndexHeader navigation={navigation.navigation} />
      ),
    },
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
      inactiveTintColor: 'white',
    },
  },
);

const AppMain = createStackNavigator(
  {
    app: AppDrawerNavigator,
    Favorite: FavoriteScreen,
  },
  {
    initialRouteName: 'app',
  },
);

export default createAppContainer(AppMain);
