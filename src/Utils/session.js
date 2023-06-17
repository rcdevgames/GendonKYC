import AsyncStorage from '@react-native-community/async-storage';

export const saveToken = async (data) => {
    return AsyncStorage.setItem("LOGGED_TOKEN", data);
}
export const getToken = async () => {
    return AsyncStorage.getItem("LOGGED_TOKEN");
}
export const clearSession = async () => {
    return AsyncStorage.clear();
}