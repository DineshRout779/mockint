import axios from 'axios';

const API = 'http://localhost:1338/api';

export const createSlotService = async (values, user, token) => {
  return await axios.post(`${API}/interview/${user._id}`, values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
