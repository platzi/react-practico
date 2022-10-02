import axios from 'axios';

export const loginService = (payload) => {
  return axios.post(`${process.env.API_URL}/auth/login`, payload).then(res => {
    return res.data;
  });
}

export const RegisterUserService = (payload) => {
  return axios.post(`${process.env.API_URL}/users/register`, payload).then(res => {
    return res.status;
  });
};

export const RecoveryPasswordUserService = (payload) => {
  return axios.post(`${process.env.API_URL}/auth/recovery`, payload).then(res => {
    return res.status;
  });
};