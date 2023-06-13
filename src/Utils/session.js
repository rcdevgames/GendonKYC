import AsyncStorage from '@react-native-community/async-storage';

export const saveUser = async (data) => {
    let values = Object.keys(data).map((value) => [value, data[value]]);
    return AsyncStorage.multiSet(values);
}

export const getToken = async () => {
    return AsyncStorage.getItem("LOGGED_TOKEN");
}

export const getUserData = async () => {
    let user = {};
    let hasNull = false;
    const data = ['LOGGED_ID','LOGGED_EMAIL','LOGGED_ROLES','LOGGED_TOKEN'];
    for (let i = 0; i < data.length; i++) {
        user[data[i]] = await AsyncStorage.getItem(data[i]);
        if (user[data[i]] == null) hasNull = true;
    }
    return hasNull ? null : user;
}
export const clearSession = async () => {
    const data = ['LOGGED_ID','LOGGED_EMAIL','LOGGED_ROLES','LOGGED_TOKEN'];
    await AsyncStorage.multiRemove(data);
    for (let i = 0; i < data.length; i++) {
    }
}