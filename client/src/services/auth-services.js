import axios from 'axios';

const API = 'http://localhost:5000/api';

export const LoginService = async (values) => {
  return await axios.post(`${API}/auth/login`, values);
};

export const SignupService = async (values) => {
  return await axios.post(`${API}/auth/signup`, values);
};
