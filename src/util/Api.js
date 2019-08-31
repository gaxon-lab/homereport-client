import axios from 'axios';

export default axios.create({
  baseURL: `http://gaxonlab.com/homereport-server/public/api/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
