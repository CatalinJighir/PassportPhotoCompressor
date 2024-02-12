import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import UtilityButtons from './UtilityButtons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  onSavePress?: () => void;
}

const ImageEditorHeader: FC<Props> = ({onSavePress}): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <UtilityButtons.BackButton onPress={() => navigation.goBack()} />
      {/* Save button */}
      <UtilityButtons.SaveButton onPress={onSavePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ImageEditorHeader;
