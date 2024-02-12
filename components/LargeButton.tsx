import React, {
  FC,
  Children,
  ReactNode,
  isValidElement,
  cloneElement,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  children?: ReactNode;
}

const LargeButton: FC<Props> = ({title, children, onPress}) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {Children.map(children, child => {
          if (!isValidElement(child)) return null;
          return cloneElement(child, {
            ...child.props,
            style: {...styles.icon, ...child.props.style},
          });
        })}
      </TouchableOpacity>
      <Text style={styles.btnLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 25,
  },
  button: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#6C9ADE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    color: '#6C9ADE',
    fontSize: 55,
  },
});

export default LargeButton;
