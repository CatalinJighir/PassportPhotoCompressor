import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress?: () => void;
}

type buttonProps = FC<Props>;

const BackButton: buttonProps = ({onPress}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="arrow-left" style={styles.icons} />
    </TouchableOpacity>
  );
};

const SaveButton: buttonProps = ({onPress}): JSX.Element => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="file-download" style={styles.icons} />
      </TouchableOpacity>
      <Text style={styles.btnTitle}>Save</Text>
    </View>
  );
};

const UtilityButtons: {BackButton: buttonProps; SaveButton: buttonProps} = {
  BackButton,
  SaveButton,
};

const buttonDim = 45;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: buttonDim,
    width: buttonDim,
    backgroundColor: '#fff',
    borderRadius: buttonDim / 2,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    fontSize: 18,
    color: '#6C9ADE',
  },
  btnTitle: {
    alignSelf: 'center',
    color: '#6C9ADE',
  },
});

export default UtilityButtons;
