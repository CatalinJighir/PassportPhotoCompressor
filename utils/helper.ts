import { PermissionsAndroid } from "react-native"

export const convertSizeinKb = (size: number): number => {
    return parseFloat((size / 1000).toFixed(2))
}

export const checkCameraPermission = async (): Promise<boolean> => {
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
}

export const takeReadAndWritePermissions = async (): Promise<boolean> => {
 const res = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
 ]);

 const writePermission =  res["android.permission.WRITE_EXTERNAL_STORAGE"];
 const readPermission =  res["android.permission.READ_EXTERNAL_STORAGE"]

 if (writePermission !== 'granted' && readPermission !== 'granted') {
    return false;
} return true;
   
}