import { AUTH_FAILURE, AUTH_REQUEST, LOGINED_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "./actionTypes.js";
import axios from "axios";


//Register
export const registerFunc = (payload) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  axios
    .post("https://admin-dashborard-node-backend.onrender.com/api/v1/users/newUser"
      , payload, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    }).then((res) => {
      console.log('res:', res)
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.message });

    })
    .catch((err) => {
      console.log('err:', err)
      dispatch({ type: AUTH_FAILURE, payload: err.response.data.message });

    });
};






export const getdata = (dispatch) => {
  dispatch({ type: AUTH_REQUEST })
  axios
    .get("https://admin-dashborard-node-backend.onrender.com/api/v1/users/me", {
      withCredentials: true
    })
    .then((res) => {
      // console.log("this",res.data.profile)
      dispatch({ type: LOGINED_USER, payload: res.data.profile });
    }).catch((err) => {
      // console.log('err:', err)
      dispatch({ type: AUTH_FAILURE });
    })
};




export const loginFunction = (payload) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST })
  axios.post("https://admin-dashborard-node-backend.onrender.com/api/v1/users/login", payload, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true,
  }).then((res) => {
    console.log('res:', res)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.message })
  }).catch((err) => {
    console.log('err:', err)
    dispatch({ type: AUTH_FAILURE, payload: err.response.data.message })
  })

}


export const logout = async (dispatch) => {
  dispatch({ type: AUTH_REQUEST })
  try {
    let res = await axios.get("https://admin-dashborard-node-backend.onrender.com/api/v1/users/logout", {
      withCredentials: true
    })
    console.log(res.data.message)
    dispatch({ type: LOGOUT_SUCCESS,payload:res.data.message })

  } catch (error) {
    // console.log('error:', error)
    dispatch({ type: AUTH_FAILURE })

  }
}