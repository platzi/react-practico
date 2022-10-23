import axios from 'axios';

export const createResidentService = (payload) => {
  return axios.post(`${process.env.API_URL}/resident/register`, payload).then(res => {
    return res.data;
  });
};

export const listResidentService = (id_business) => {
  return axios.get(`${process.env.API_URL}/resident/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateResidentService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/resident/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteResidentService = (id) => {
  return axios.post(`${process.env.API_URL}/resident/delete/${id}`).then(res => {
    return res.data;
  });
};