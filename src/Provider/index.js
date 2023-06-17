import {sys_get, sys_post} from '../Utils/api_client';
import {getToken, saveToken} from '../Utils/session';
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
    let response = await sys_post({auth: true, endpoint: url, body: {
        "member_id": 1,
        "username": "diego"
    }});
    console.log(response)
    if (response.status) {
        await saveToken(response.data?.kyc_request?.key || null);
        return true;
    } 
    return null;
}

export const insertBiodata = async (data) => {
    let response = await sys_post({auth: true, endpoint: "kyc/kyc-member", body: data});
    if (response.status) return true;
    console.log(response);
    return false;
}

export const uploadFoto = async (uri, type="ktp") => {
    let response = await sys_post({auth: true, endpoint: `kyc/${type}`, body: {
        uri,
        type: "JPEG",
        name: `${type}.jpg`,
    }});
    if (response.status) return true;
    console.log(response);
    return false;
}