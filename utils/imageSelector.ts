import {PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type imageResultType = {path: string, error: unknown | null};

export const requestedCameraPermission = async ():Promise<void> => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'You have to accept the permission. Only then you will be able to take picture',
            buttonNeutral: 'Ask me later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (error) {
        console.log('Fail to open camera, error inside camera permission', error);
      }
}

export const selectAndCropImageFromCamera = async (
  width: number = 413, 
  height: number = 531
  ): Promise<imageResultType> => {
  try {
    await requestedCameraPermission;
    // open the camera
    const {path} = await ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    });
    return {path, error: null}
  } catch (error) {
    return {path: '', error}
  }
}

export const selectAndCropImageFromDevice = async (
  width: number = 413, 
  height: number = 531
  ): Promise<imageResultType> => {
  try {
     await requestedCameraPermission;
    // open the picker (gallery)
    const {path} = await ImagePicker.openPicker({
      width,
      height,
      cropping: true,
    });
    return {path, error: null}
  } catch (error) {
    return {path: '', error}
  }
}