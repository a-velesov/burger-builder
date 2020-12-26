import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-b6263.firebaseio.com/',
});

export default instance;
