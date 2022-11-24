import axios from 'axios';

export const createConstructionSiteService = (payload) => {
  return axios.post(`${process.env.API_URL}/constructionSite/register`, payload).then(res => {
    return res.data;
  });
};

export const listConstructionSiteService = (id_business) => {
  return axios.get(`${process.env.API_URL}/constructionSite/list/${id_business}`).then(res => {
    return res.data;
  });
};

export const updateConstructionSiteService = (id, payload) => {
  return axios.patch(`${process.env.API_URL}/constructionSite/update/${id}`, payload).then(res => {
    return res.data;
  });
};

export const deleteConstructionSiteService = (id) => {
  return axios.post(`${process.env.API_URL}/constructionSite/delete/${id}`).then(res => {
    return res.data;
  });
};