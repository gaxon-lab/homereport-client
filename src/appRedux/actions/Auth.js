import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  INIT_URL, LOGGED_USER_PERMISSION,
  SHOW_MESSAGE,
  SIGNOUT_USER_SUCCESS,
  UPDATE_USER_PERMISSION_DATA,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import axios from 'util/Api'
import Permissions from "../../util/Permissions";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};


export const onUserSignIn = ({email, password}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/login', {
        email: email,
        password: password,
      }
    ).then(({data}) => {
      console.info("userSignIn: ", data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token});
        dispatch({type: USER_DATA, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetUserPermission = (history) => {
  console.log("onGetUserPermission");
  return (dispatch) => {
    dispatch({type: FETCH_USER_INFO_START});
    axios.get('/permissions/list',
    ).then(({data}) => {
      console.log("onGetUserPermission: ", data);
      if (data.success) {
        dispatch({type: FETCH_USER_INFO_SUCCESS});
        dispatch({type: UPDATE_USER_PERMISSION_DATA, payload: data.data});
        localStorage.setItem("settings", JSON.stringify(data.data));
        Permissions.setPermissions(data.data);
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: data.errors[0]});
        history.push("/signin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: data.errors[0]});
        history.push("/signin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        history.push("/signin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: USER_TOKEN_SET, payload: ''});
        dispatch({type: USER_DATA, payload: null});
        dispatch({type: FETCH_ERROR, payload: error.response.data.message});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: error.response.data.message});
      } else {
        console.log("error: ", JSON.stringify(error));
        dispatch({type: FETCH_ERROR, payload: error.message});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      }
    });
  }
};

// export const setUserDefaultSetting = (data) => {
//   return (dispatch) => {
//     dispatch({type: UPDATE_USER_PERMISSION_DATA, payload: data});
//   }
// };


export const onUserSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("settings");
      localStorage.removeItem("user");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
    }, 2000);
  }
};

export const showErrorMessage = (error) => {
  console.log("error", error);
  if (error.response.status === 401) {
    return ({type: FETCH_ERROR, payload: error.response.data.message});
  } else if (error.response.status === 403) {
    return ({type: FETCH_ERROR, payload: error.response.data.message});
  } else {
    console.log("Error****:", error.message);
    return ({type: FETCH_ERROR, payload: error.message});
  }
};


export const getUserProfile = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/current/user/detail',).then(({data}) => {
      console.info("getUserProfile: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onResetPassword = ({email}, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/forgot/password', {
        email: email
      }
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "Reset password link has been successfully sent to your email address"});
        history.push("/reset/password");
      } else if (data.message) {
        console.info("payload: data.errors[0]", data.message);
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        console.info("payload: data.errors[0]", data.errors[0]);
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSetNewPassword = (pin, data, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/reset/password/${pin}`, data
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The password has been updated successfully"});
        history.replace("/signin");
      } else if (data.message) {
        console.info("payload: data.errors[0]", data.message);
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        console.info("payload: data.errors[0]", data.errors[0]);
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onUpdateUserProfile = ({first_name, last_name, profile_pic, password, password_confirmation}) => {
  console.log("data",first_name, last_name, profile_pic, password, password_confirmation)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/current/user/update', {
        first_name: first_name,
        last_name: last_name,
        profile_pic: profile_pic,
        password: password,
        password_confirmation: password_confirmation
      }
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Personal details have been updated successfully"});
        dispatch({type: USER_DATA, payload: data.data});
      } else if (data.message) {
        console.info("payload: data.errors[0]", data.message);
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        console.info("payload: data.errors[0]", data.errors[0]);
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetLoggedUserPermission = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/user/permissions',).then(({data}) => {
      console.log("onGetLoggedUserPermission: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LOGGED_USER_PERMISSION, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
}




