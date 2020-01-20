import axios from 'util/Api'
import {fetchError, fetchStart, fetchSuccess} from "../appRedux/actions";


export const imageUpload = (file, onGetDocumentId) => {
  const data = new FormData();
  data.append('file', file);
  data.append('title', file.name);
  data.append('mime_type', file.type);
  fetchStart();
  axios.post("/uploads/temporary/media", data, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  }).then(({data}) => {
    if (data.success) {
      fetchSuccess();
      onGetDocumentId(data.data);
    } else {
      fetchError(data.errors[0])
    }
  }).catch((error) => {
    fetchError(error)
  });
};
