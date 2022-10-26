import axios from 'axios';

export const createEmployeService = (payload) => {
  return axios.post(`${process.env.API_URL}/employes/register`, payload).then(res => {
    return res.data;
  });
};

export const listEmployeService = (id_business) => {
  return axios.get(`${process.env.API_URL}/employes/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateEmployeService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/employes/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteEmployeService = (id) => {
  return axios.post(`${process.env.API_URL}/employes/delete/${id}`).then(res => {
    return res.data;
  });
};