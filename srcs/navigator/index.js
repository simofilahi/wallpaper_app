import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AbstractScreen from '../screens/AbstractScreen';
import AnimalScreen from '../screens/AnimalScreen';
import ArtisticScreen from '../screens/ArtisticScreen';
import DarkScreen from '../screens/DarkScreen';
import EarthScreen from '../screens/EearthScreen';
import CelebrityScreen from '../screens/CelebrityScreen';
import ComicsScreen from '../screens/ComicsScreen';
import FantasyScreen from '../screens/FantasyScreen';
import FoodScreen from '../screens/FoodScreen';
import GameScreen from '../screens/GameScreen';
import HolidayScreen from '../screens/HolidayScreen';
import HumorScreen from '../screens/HumorScreen';
import MenScreen from '../screens/MenScreen';
import MilitaryScreen from '../screens/MilitaryScreen';
import MiscScreen from '../screens/MiscScreen';
import MovieScreen from '../screens/MovieScreen';
import MusicScreen from '../screens/MusicScreen';
import PhotographyScreen from '../screens/PhotographyScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ReligiousScreen from '../screens/ReligiousScreen';
import SciFiScreen from '../screens/SciFiScreen';
import TechnologyScreen from '../screens/TechnologyScreen';
import TVshowScreen from '../screens/TVshowScreen';
import VehiclesScreen from '../screens/VehiclesScreen';
import VideogameScreen from '../screens/VideogameScreen';
import WeaponsScrren from '../screens/WeaponsScrren';
import WomenScreen from '../screens/WomenScreen';
import SettingScreen from '../screens/SettingScreen';
// import SplashScreen from '../screens/SplachScreen';

import FavoriteScreen from '../screens/FavoriteScreen';
import CustomDrawerContentComponent from './DrawerHeader';
import IndexHeader from '../screens/IndexHeader';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Popular: HomeScreen,
    Abstract: AbstractScreen,
    Animal: AnimalScreen,
    Artistic: ArtisticScreen,
    Dark: DarkScreen,
    Earth: EarthScreen,
    Celebrity: CelebrityScreen,
    Comics: ComicsScreen,
    Fantasy: FantasyScreen,
    Food: FoodScreen,
    Game: GameScreen,
    Holiday: HolidayScreen,
    Humor: HumorScreen,
    Men: MenScreen,
    Military: MilitaryScreen,
    Misc: MiscScreen,
    Movies: MovieScreen,
    Music: MusicScreen,
    Photography: PhotographyScreen,
    Products: ProductsScreen,
    Religious: ReligiousScreen,
    SciFi: SciFiScreen,
    Technology: TechnologyScreen,
    TVshow: TVshowScreen,
    Vehicles: VehiclesScreen,
    VideoGAME: VideogameScreen,
    Weapons: WeaponsScrren,
    Women: WomenScreen,
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

const App = createStackNavigator(
  {
    app: AppDrawerNavigator,
    Favorite: FavoriteScreen,
    Settings: SettingScreen,
  },
  {
    initialRouteName: 'app',
  },
);

// const AppMain = createSwitchNavigator(
//   {
//     app: App,
//     Splash: SplashScreen,
//   },
//   {
//     initialRouteName: 'app',
//   },
// );

export default createAppContainer(App);
