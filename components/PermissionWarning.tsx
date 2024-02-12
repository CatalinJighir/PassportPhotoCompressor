import React, {FC} from 'react';
import {Linking} from 'react-native';
import ConfirmModal from './ConfirmModal';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const PermissionWarning: FC<Props> = ({
  visible,
  onClose,
  title,
  message,
}): JSX.Element => {
  const handlerOpenSettings = (): void => {
    onClose();
    Linking.openSettings();
  };

  return (
    <ConfirmModal
      visible={visible}
      primaryBtnTitle="Open Settings"
      dangerBtnTitle="I will not!"
      title={title}
      message={message}
      onDangerBtnPress={onClose}
      onPrimaryBtnPress={handlerOpenSettings}
    />
  );
};

export default PermissionWarning;
