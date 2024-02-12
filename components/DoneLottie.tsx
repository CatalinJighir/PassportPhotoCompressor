import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
  onFinished?: () => void;
}

const DoneLottie: FC<Props> = ({visible, onFinished}): JSX.Element | null => {
  if (!visible) return null;
  return (
    <LottieView
      source={require('../app/source/done.json')}
      autoPlay
      loop={false}
      style={styles.container}
      onAnimationFinish={onFinished}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
});

export default DoneLottie;
