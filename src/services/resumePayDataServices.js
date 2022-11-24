import axios from 'axios';

export const createResumePayDataService = (payload) => {
  return axios.post(`${process.env.API_URL}/resumePayData/register`, payload).then(res => {
    return res.data;
  });
};

export const listResumePayDataService = (id_business) => {
  return axios.get(`${process.env.API_URL}/resumePayData/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateResumePayDataService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/resumePayData/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteResumePayDataService = (id) => {
  return axios.post(`${process.env.API_URL}/resumePayData/delete/${id}`).then(res => {
    return res.data;
  });
};