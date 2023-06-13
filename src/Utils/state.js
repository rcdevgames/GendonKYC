import {entity} from 'simpler-state';
const _userData = entity(null);

export const setUserdata = v => _userData.set(v);
export const getUserdata = () => _userData.get();