import axios from 'axios';

export const createContractorService = (payload) => {
  return axios.post(`${process.env.API_URL}/contractor/register`, payload).then(res => {
    return res.data;
  });
};

export const listContractorService = (id_user) => {
  return axios.get(`${process.env.API_URL}/contractor/list/${id_user}`).then(res => {
    return res.data;
  });
};