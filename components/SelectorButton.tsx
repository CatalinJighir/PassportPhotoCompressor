import React, {
  FC,
  Children,
  ReactNode,
  isValidElement,
  cloneElement,
} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  title: string;
  children?: ReactNode;
  onPress?: () => void;
}

const SelectorButton: FC<Props> = ({onPress, title, children}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {Children.map(children, child => {
        if (!isValidElement(child)) return null;
        return cloneElement(child, {
          ...child.props,
          style: {...styles.btnIcon, ...child.props.style},
        });
      })}
      <Text style={styles.btnLabel}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C9ADE',
    padding: 10,
    borderRadius: 10,
  },
  btnLabel: {
    color: '#fff',
  },
  btnIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
});

export default SelectorButton;
