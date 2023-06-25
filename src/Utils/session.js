import AsyncStorage from '@react-native-community/async-storage';

export const saveUser = async (data) => {
    return AsyncStorage.setItem("LOGGED_USER", JSON.stringify(data));
}
export const getUser = async () => {
    const user = await AsyncStorage.getItem("LOGGED_USER");
    if (user !== null) return JSON.parse(user);
    return user;
}
export const saveToken = async (data) => {
    return AsyncStorage.setItem("LOGGED_TOKEN", data);
}
export const getToken = async () => {
    return AsyncStorage.getItem("LOGGED_TOKEN");
}
export const clearSession = async () => {
    return AsyncStorage.clear();
}