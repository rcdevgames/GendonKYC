import {sys_get, sys_post} from '../Utils/api_client';
import {getToken, saveToken, getUser} from '../Utils/session';
import {setUserdata} from '../Utils/state';

export const getStatus = async () => {
    await register();
    let response = await sys_get({auth: true, endpoint: "kyc/status"});
    console.log(response);
    if (response.status) {
        setUserdata(response.data);
        return response.data;
    }
    return null;
}

export const register = async (reinit=false) => {
    let url = "kyc/create";
    if (reinit) url = "kyc/recreate";
    const body = await getUser();
    if (body) {
        let response = await sys_post({auth: true, endpoint: url, body });
        // console.log(response);
        if (response.status) {
            await saveToken(response.data?.kyc_request?.key || null);
            return true;
        } 
    }
    return null;
}

export const insertBiodata = async (data) => {
    let response = await sys_post({auth: true, endpoint: "kyc/kyc-member", body: data});
    // console.log(response);
    if (response.status) return true;
    return false;
}

export const uploadFoto = async (uri, type="ktp") => {
    let body = {};
    body[`${type}_file`] = {
        uri,
        type: "image/jpeg",
        name: `${type}.jpg`,
    };
    let response = await sys_post({auth: true, endpoint: `kyc/${type}`, body});
    // console.log(response);
    return response.status;
}

export const login = async ({username, password}) => {
    let response = await sys_post({auth: true, endpoint: 'login', body: {username, password}});
    return response.data;
}

export const registration = async ({nama_lengkap, username, password}) => {
    let response = await sys_post({auth: true, endpoint: 'register', body: {nama_lengkap, username, password}});
    return response.status;
}