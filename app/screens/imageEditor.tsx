import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../navigation/AppNavigator';
import ImageEditorHeader from '../../components/ImageEditorHeader';
import BackgroundImageEditor from '../../components/BackgroundImageEditor';
import SelectedImage from '../../components/SelectedImage';
import EditorTools from '../../components/EditorTools';
import {selectAndCropImageFromDevice} from '../../utils/imageSelector';
import {selectAndCropImageFromCamera} from '../../utils/imageSelector';
import ConfirmModal from '../../components/ConfirmModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import fsModule from '../modules/fsModule';
import {convertSizeinKb, takeReadAndWritePermissions} from '../../utils/helper';
import BusyLoading from '../../components/BusyLoading';
import DoneLottie from '../../components/DoneLottie';
import PermissionWarning from '../../components/PermissionWarning';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showPermissionWarning, setShowPermissionWarning] =
    useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [processedFinished, setProcessedFinished] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [compressedImage, setCompressedImage] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressValue, setCompressValue] = useState<number>(1);
  const [compressPercentage, setCompressPercentage] = useState<number>(100);
  const [compressionStarts, setCompressionStarts] = useState<boolean>(false);
  const {imageUri} = route.params;
  const backActionRef = useRef<any>();

  const resetActivity = (): void => {
    setCompressValue(1);
    setCompressPercentage(100);
    setCompressedImage('');
  };

  const displayConfirmModal = (): void => {
    setShowConfirmModal(true);
  };

  const hideConfirmModal = (): void => {
    setShowConfirmModal(false);
  };

  const selectImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromDevice();
    if (error) return console.log(error);
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const captureImageToCompress = async (): Promise<void> => {
    const {path, error} = await selectAndCropImageFromCamera();
    if (error) return console.log(error);
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  // Handling discard
  const handleDiscardModal = () => {
    setShowConfirmModal(false);
    console.log(backActionRef.current);
    navigation.dispatch(backActionRef.current);
  };

  const getImageSize = async (imageUri: string): Promise<void> => {
    const uri: string = imageUri.split('file:///')[1];
    const size = await fsModule.getSize(uri);
    setFileSize(convertSizeinKb(size));
  };

  const handlerImageCompress = async (value: number): Promise<void> => {
    if (!compressionStarts) return;
    const compressValue: number = Math.floor(value * 100);
    const uri: string = selectedImage.split('file:///')[1];

    setBusy(true);
    const res = await fsModule.compressImage(uri, compressValue);
    setBusy(false);
    setCompressedImage('file:///' + res.uri);
    setFileSize(convertSizeinKb(res.size));
    setCompressPercentage(Math.round(value * 100));
  };

  const handleImageSave = async (): Promise<void> => {
    try {
      const isGranted = await takeReadAndWritePermissions();
      if (!isGranted) return setShowPermissionWarning(true);
      const name = 'pp-' + Date.now();
      const desiredCompressValue: number = Math.floor(compressValue * 100);

      const uri: string = compressedImage.split('file:///')[1];
      const res = await fsModule.saveImageToDevice(
        uri,
        name,
        desiredCompressValue,
      );

      if (res === 'Done') {
        setProcessedFinished(true);
      }

      console.log(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateCompressedValue = (value: number): void => {
    setCompressValue(value);
  };

  // Handling the back bress
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      displayConfirmModal();
      backActionRef.current = e.data.action;
    });
  }, []);

  useEffect(() => {
    if (imageUri && !selectedImage) {
      setSelectedImage(imageUri);
      getImageSize(imageUri);
    }
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <ImageEditorHeader onSavePress={handleImageSave} />
      <BackgroundImageEditor />

      <View style={styles.imageContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {(busy || processedFinished) && (
            <>
              <BusyLoading visible={busy} />
              <DoneLottie
                visible={processedFinished}
                onFinished={() => setProcessedFinished(false)}
              />
            </>
          )}
        </SelectedImage>
      </View>

      <EditorTools
        compressValue={compressValue}
        compressPercentage={compressPercentage}
        fileSize={fileSize}
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
        onSliderChange={handlerImageCompress}
        onSlidingStart={() => setCompressionStarts(true)}
        onSlidingComplete={updateCompressedValue}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        message="Are you sure because this action will discard all you changes."
        primaryBtnTitle="Cancel"
        dangerBtnTitle="Discard"
        onPrimaryBtnPress={hideConfirmModal}
        onDangerBtnPress={handleDiscardModal}
      />

      <PermissionWarning
        visible={showPermissionWarning}
        title="Require File Write Permission"
        message="This app needs the permission to save this file inside your device!"
        onClose={() => setShowPermissionWarning(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageEditor;
