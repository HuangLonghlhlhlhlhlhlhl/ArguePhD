import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AiInteractionScreen from '../screens/AiInteractionScreen';
import TranslatorScreen from '../screens/TranslatorScreen';
import MemeScreen from '../screens/MemeScreen';
import SimulatorScreen from '../screens/SimulatorScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CompetitionScreen from '../screens/CompetitionScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="AiInteraction" component={AiInteractionScreen} />
        <Stack.Screen name="Translator" component={TranslatorScreen} />
        <Stack.Screen name="Meme" component={MemeScreen} />
        <Stack.Screen name="Simulator" component={SimulatorScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Competition" component={CompetitionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
