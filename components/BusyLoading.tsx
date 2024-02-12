import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
}

const BusyLoading: FC<Props> = ({visible}): JSX.Element | null => {
  if (!visible) return null;
  return (
    <LottieView
      source={require('../app/source/loading.json')}
      autoPlay
      loop
      speed={2}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
});

export default BusyLoading;
