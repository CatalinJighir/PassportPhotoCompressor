import 'react-native-gesture-handler';
import React, {FC} from 'react';
import AppNavigator from './navigation/AppNavigator';

interface Props {}

const App: FC<Props> = (props): JSX.Element => {
  return <AppNavigator />;
};

export default App;
