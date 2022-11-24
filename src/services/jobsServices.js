import axios from 'axios';

export const createJobsService = (payload) => {
  return axios.post(`${process.env.API_URL}/jobs/register`, payload).then(res => {
    return res.data;
  });
};

export const listJobsService = (id_business) => {
  return axios.get(`${process.env.API_URL}/jobs/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateJobsService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/jobs/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteJobsService = (id) => {
  return axios.post(`${process.env.API_URL}/jobs/delete/${id}`).then(res => {
    return res.data;
  });
};