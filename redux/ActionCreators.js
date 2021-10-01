import * as ActionTypes from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCBwjCOut8zwfn1BDQt5ZjixdHozx-HacQ",
  authDomain: "aquarium-ddb3a.firebaseapp.com",
  databaseURL: "https://aquarium-ddb3a.firebaseio.com",
  projectId: "aquarium-ddb3a",
  storageBucket: "aquarium-ddb3a.appspot.com",
  messagingSenderId: "170360798295",
  appId: "1:170360798295:web:74c1dd1c86cb63fafa3712",
  measurementId: "G-JTMYFGQ7FR",
};
const FireApp = firebase.initializeApp(firebaseConfig);

export const createUser = (email, password) => (dispatch) => {
  dispatch(createUserLoading());
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch(createUserSuccess(user));
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(createUserError(error));
      // ..
    });
};
export const createUserLoading = () => ({
  type: ActionTypes.USR_CREATE_LOAD,
  payload: true,
});
export const createUserSuccess = (user) => ({
  type: ActionTypes.USR_CREATE_SUCCESS,
  payload: user,
});
export const createUserError = (err) => ({
  type: ActionTypes.USR_CREATE_ERR,
  payload: err,
});










export const getUser = () => (dispatch) => {
    dispatch(getUserLoading());
    var user = firebase.auth().currentUser;
    if (user) {
       dispatch(getUserSuccess(user));
      } else {
        dispatch(getUserError(false));
      }

  };
  export const getUserLoading = () => ({
    type: ActionTypes.USR_GET_LOAD,
    payload: true,
  });
  export const getUserSuccess = (user) => ({
    type: ActionTypes.USR_GET_SUCCESS,
    payload: user,
  });
  export const getUserError = (err) => ({
    type: ActionTypes.USR_GET_ERR,
    payload: err,
  });















  export const signoutUser = () => (dispatch) => {
    dispatch(outUserLoading());

    firebase.auth().signOut().then(() => {
    dispatch(outUserSuccess());
}).catch((error) => {
    dispatch(outUserError(error));
});

  };
  export const outUserLoading = () => ({
    type: ActionTypes.USR_OUT_LOAD,
    payload: true,
  });
  export const outUserSuccess = () => ({
    type: ActionTypes.USR_OUT_SUCCESS,
    payload: user,
  });
  export const outUserError = (err) => ({
    type: ActionTypes.USR_OUT_ERR,
    payload: err,
  });














export const fetchData = () => (dispatch) => {
  dispatch(dataLoading());
  SecureStore.getItemAsync("userinfo")
    .then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        dispatch(addData(userinfo));
      } else {
        dispatch(dispatch(dataError()));
      }
    })
    .catch((error) => console.log("Could not Save user " + error));
};
export const saveData = (data) => (dispatch) => {
  console.log("State Saveing process");
  dispatch(dataLoading());
  SecureStore.setItemAsync(
    "userinfo",
    JSON.stringify({ username: data.username, password: data.password })
  )
    .then(dispatch(addData(data)))
    .catch((error) => console.log("Could not Save user " + error));
};
export const deleteData = () => (dispatch) => {
  SecureStore.deleteItemAsync("userinfo")
    .then(dispatch(removeData()))
    .catch((error) => console.log("Could not Delete user " + error));
};

export const dataLoading = () => ({
  type: ActionTypes.APP_LOADING,
  payload: true,
});
export const addData = (data) => ({
  type: ActionTypes.APP_UPDATE,
  payload: data,
});
export const dataError = () => ({
  type: ActionTypes.APP_ERROR,
  payload: true,
});
export const removeData = () => ({
  type: ActionTypes.APP_DELETE,
  payload: true,
});
