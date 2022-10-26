import axios from 'axios';

export const createResumePayService = (payload) => {
  return axios.post(`${process.env.API_URL}/resumePay/register`, payload).then(res => {
    return res.data;
  });
};

export const listResumePayService = (id_business) => {
  return axios.get(`${process.env.API_URL}/resumePay/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateResumePayService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/resumePay/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteResumePayService = (id) => {
  return axios.post(`${process.env.API_URL}/resumePay/delete/${id}`).then(res => {
    return res.data;
  });
};