import axios from 'axios';

export const createCitiesService = (payload) => {
  return axios.post(`${process.env.API_URL}/cities/register`, payload).then(res => {
    return res.data;
  });
};

export const listCitiesService = (id_business) => {
  return axios.get(`${process.env.API_URL}/cities/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const deleteCitiesService = (id) => {
  return axios.post(`${process.env.API_URL}/cities/delete/${id}`).then(res => {
    return res.data;
  });
};

export const updateCitiesService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/cities/update/${id}`, payload).then(res => {
    return res.data;
  });
}