import React, {FC, ReactNode} from 'react';
import {StyleSheet, View, Image} from 'react-native';

interface Props {
  uri: string;
  children?: ReactNode;
}

const SelectedImage: FC<Props> = ({children, uri}): JSX.Element | null => {
  if (!uri) return null;
  return (
    <View style={styles.container}>
      {children || <Image source={{uri}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 206,
    height: 265,
    backgroundColor: '#fff',
    elevation: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SelectedImage;
