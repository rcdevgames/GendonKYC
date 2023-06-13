import { getToken } from "./session";

const callbackModel = {
  code: 503,
  status: false,
  message: 'Network request failed',
  data: null,
};

const API_URL = "";

export const sys_get = async ({auth = false, endpoint = ''}) => {
  
  let token = await getToken();
  var callback = callbackModel;
  const response = await fetch(API_URL + endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth ? 'Bearer ' + token : '',
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
      'Content-Type': 'application/json',
      Authorization: auth ? 'Bearer ' + token : '',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  callback.code = response.status;
  callback.status = response.status == 200 || response.status == 201;
  callback.message = data.message;
  callback.data = data.data;
  if (response.status > 201 && response.status < 200) throw callback;
  return callback;
};
