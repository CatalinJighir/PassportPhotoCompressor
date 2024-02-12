import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectorButton from './SelectorButton';
import Slider from '@react-native-community/slider';

interface Props {
  fileSize?: number;
  compressValue: number;
  compressPercentage?: number;
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
  onSliderChange?: (value: number) => void;
  onSlidingStart: (value: number) => void;
  onSlidingComplete: (value: number) => void;
}

const EditorTools: FC<Props> = ({
  onSelectAnother,
  onCaptureAnother,
  fileSize,
  onSliderChange,
  compressValue,
  compressPercentage,
  onSlidingStart,
  onSlidingComplete,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <SelectorButton onPress={onSelectAnother} title="Select Another">
          <Icon name="folder-open" />
        </SelectorButton>

        <SelectorButton onPress={onCaptureAnother} title="Capture Another">
          <Icon name="camera" />
        </SelectorButton>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Compressed to: {compressPercentage} %</Text>
        <Text style={styles.label}>Image size: {fileSize} KB</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0.1}
          maximumValue={1}
          value={compressValue}
          maximumTrackTintColor="rgba(108,154,222,0.8)"
          minimumTrackTintColor="rgb(108,154,222)"
          thumbTintColor="rgb(108,154,222)"
          onValueChange={onSliderChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#fff',
    elevation: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    color: '#272727',
    fontSize: 16,
  },
  sliderContainer: {
    paddingVertical: 15,
  },
});

export default EditorTools;
