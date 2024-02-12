import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LargeButton from '../../components/LargeButton';
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from '../../utils/imageSelector';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {checkCameraPermission} from '../../utils/helper';
import PermissionWarning from '../../components/PermissionWarning';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Home: FC<Props> = ({navigation}): JSX.Element => {
  const [showPermissionInfoAlert, setShowPermissionInfoAlert] =
    useState<boolean>(false);
  const navigateToImageEditor = (uri: string) => {
    navigation.navigate('ImageEditor', {imageUri: uri});
  };

  const handleImageCapture = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();

    if (error) {
      const isGranted: boolean = await checkCameraPermission();
      if (!isGranted) return setShowPermissionInfoAlert(true);
    }

    if (path) navigateToImageEditor(path);
  };

  const handleImageSelection = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();
    if (error) return console.log(error);

    navigateToImageEditor(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose your image</Text>
        <Text style={styles.subtitle}>
          You can select your image using one of these option which you want to
          convert to passport size.
        </Text>
      </View>

      {/* Capture button */}
      <LargeButton onPress={handleImageCapture} title="Capture">
        <Icon name="camera" />
      </LargeButton>

      {/* Image Select button */}
      <LargeButton onPress={handleImageSelection} title="Select">
        <Icon name="folder-open" />
      </LargeButton>

      <PermissionWarning
        visible={showPermissionInfoAlert}
        title="Require Camera Permission"
        message="This app is heavely best on camera so you have to accept the permission"
        onClose={() => setShowPermissionInfoAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#272727',
    textAlign: 'center',
  },
  subtitle: {
    color: '#272727',
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 5,
  },
});

export default Home;
