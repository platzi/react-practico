import {SET_USER} from './types';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});