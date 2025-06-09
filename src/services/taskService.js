import axios from 'axios';

const API = 'http://localhost:8080/api';

export const getTasks = (page = 1, size = 20) => 
  axios.get(`${API}/tasks?page=${page}&size=${size}`);

export const createTask = (task) => 
  axios.post(`${API}/task`, task);

export const updateTask = (id, task) => 
  axios.put(`${API}/task/${id}`, task);

export const deleteTask = (id) => 
  axios.delete(`${API}/task/${id}`);
