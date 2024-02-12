import React, {FC} from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
  dangerBtnTitle: string;
  primaryBtnTitle: string;
  onPrimaryBtnPress?: () => void;
  onDangerBtnPress?: () => void;
}

const ConfirmModal: FC<Props> = ({
  visible,
  title,
  message,
  dangerBtnTitle,
  primaryBtnTitle,
  onPrimaryBtnPress,
  onDangerBtnPress,
}): JSX.Element => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={onPrimaryBtnPress}
              style={[styles.commonBtnStyle, styles.cancel]}>
              <Text>{primaryBtnTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDangerBtnPress}
              style={[styles.commonBtnStyle, styles.discard]}>
              <Text style={styles.discardText}>{dangerBtnTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6C9ADE',
  },
  message: {
    color: '#272727',
    opacity: 0.8,
    lineHeight: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  commonBtnStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  cancel: {
    borderWidth: 1.5,
    borderColor: '#6C9ADE',
  },
  discard: {
    backgroundColor: '#F53649',
    marginLeft: 15,
  },
  discardText: {
    color: '#fff',
  },
});

export default ConfirmModal;
