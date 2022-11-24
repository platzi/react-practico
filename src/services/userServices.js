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

export const SendCredentialsUserService = (email, password) => {
  return axios.post(`${process.env.API_URL}/auth/newChecador`, {email, password}).then(res => {
    return res.status;
  });
};

export const ListCheckersService = (id_contractor) => {
  return axios.get(`${process.env.API_URL}/users/checkers/${id_contractor}`).then(res => {
    return res.data;
  });
};

export const DeleteCheckersService = (id_contractor) => {
  return axios.delete(`${process.env.API_URL}/users/${id_contractor}`).then(res => {
    return res.data;
  });
};

export const UpdateCheckersService = (id_contractor, changes) => {
  return axios.put(`${process.env.API_URL}/users/${id_contractor}`, changes).then(res => {
    return res.data;
  });
};