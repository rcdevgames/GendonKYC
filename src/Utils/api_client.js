import { getToken } from "./session";

const callbackModel = {
  code: 503,
  status: false,
  message: 'Network request failed',
  data: null,
};

const API_URL = "http://kyc.rcdevgames.net/api/";

export const sys_get = async ({auth = false, endpoint = ''}) => {
  
  let token = await getToken();
  var callback = callbackModel;
  const response = await fetch(API_URL + endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-key': auth ? token : '',
    },
  });
  const data = await response.json();
  
  callback.code = response.status;
  callback.status = response.status == 200;
  callback.message = data.message;
  callback.data = data.data;
  if (response.status > 201 && response.status < 200) throw callback;
  return callback;
};
export const sys_post = async ({auth = false, endpoint = '', body = {}}) => {
  let token = await getToken();
  var callback = callbackModel;
  const response = await fetch(API_URL + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-key': auth ? token : '',
    },
    body: json2FormData(body),
  });
  const data = await response.json();
  callback.code = response.status;
  callback.status = response.status == 200 || response.status == 201;
  callback.message = data.message;
  callback.data = data.data;
  if (response.status > 201 && response.status < 200) throw callback;
  return callback;
};

const json2FormData = (json) => {
  let fData = new FormData();
  for(let idx in json) {
    fData.append(idx, json[idx])
  }
  return fData
}
