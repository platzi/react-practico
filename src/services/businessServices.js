import axios from 'axios';

export const createBusinessService = (payload) => {
  return axios.post(`${process.env.API_URL}/business/register`, payload).then(res => {
    return res.data;
  });
};

export const listBusinessService = (id_user) => {
  return axios.get(`${process.env.API_URL}/business/list/${id_user}`).then(res => {
    return res.data;
  });
};

export const updateBusinessService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/business/update/${id}`, payload).then(res => {
    return res.data;
  });
};