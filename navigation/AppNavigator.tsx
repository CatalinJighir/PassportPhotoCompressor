import React, {FC} from 'react';
import {
  NavigationContainer,
  Theme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImageEditor from '../app/screens/imageEditor';
import Home from '../app/screens/home';

export type RootStackParamList = {
  Home: undefined;
  ImageEditor: {imageUri: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const CUSTOM_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

interface Props {}

const AppNavigator: FC<Props> = (): JSX.Element => {
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
