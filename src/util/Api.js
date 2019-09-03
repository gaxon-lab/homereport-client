import axios from 'axios';

export default axios.create({
  baseURL: `http://gaxonlab.com/homereport-server/api/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
