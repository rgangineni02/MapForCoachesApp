import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.54:5000/api/users', // Replace <your-ip-address> with your server's IP address
});

export default API;

