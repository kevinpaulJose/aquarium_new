import * as ActionTypes from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import firebase from 'firebase'
import User from "../datatypes/user";
import "../firebase/config"

const userCollection = firebase.firestore().collection("users");
const cartCollection = firebase.firestore().collection("cart");
const wishCollection = firebase.firestore().collection("wish");
const productCollection = firebase.firestore().collection("products");
const addressCollection = firebase.firestore().collection("address");



export const getUser = () => (dispatch) => {
    dispatch(getUserLoading());
    var user = firebase.auth().currentUser;
    if (user) {
      // console.log(user.uid)
      userCollection.where("userid", "==", user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(getUserSuccess(doc.data()));
        }) 
      }).catch((error) => {
        dispatch(getUserSuccess(false));
        dispatch(getUserError(true))
      })
      //  dispatch(getUserSuccess(userGot));
      } else {
        dispatch(getUserSuccess(false));
        dispatch(getUserError(true))
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








  export const getCart = (uid) => (dispatch) => {
    dispatch(getCartLoading());
    if(uid == null) {
      dispatch(getCartSuccess([]));
    }else {
      cartCollection.where("userid", "==", uid).get().then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc)=> {
          temp.push(doc.data());
          console.log(doc.data())
        })
        dispatch(getCartSuccess(temp));
      }).catch((error) => {
        dispatch(getCartError(error))
      })
    }



  };
  export const getCartLoading = () => ({
    type: ActionTypes.CRT_GET_LOAD,
    payload: true,
  });
  export const getCartSuccess = (cartData) => ({
    type: ActionTypes.CRT_GET_SUCCESS,
    payload: cartData,
  });
  export const getCartError = (err) => ({
    type: ActionTypes.CRT_GET_ERR,
    payload: err,
  });


export const getAddress = (uid) => (dispatch) => {
  dispatch(getAddressLoading());
  if(uid == null) {
    dispatch(getAddressSuccess([]));
  }else {
    addressCollection.where("userid", "==", uid).get().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc)=> {
        temp.push(doc.data());
        console.log(doc.data())
      })
      dispatch(getAddressSuccess(temp));
    }).catch((error) => {
      dispatch(getAddressError(error))
    })
  }



};
export const getAddressLoading = () => ({
  type: ActionTypes.ADD_GET_LOAD,
  payload: true,
});
export const getAddressSuccess = (cartData) => ({
  type: ActionTypes.ADD_GET_SUCCESS,
  payload: cartData,
});
export const getAddressError = (err) => ({
  type: ActionTypes.ADD_GET_ERR,
  payload: err,
});


  export const getWish = (uid) => (dispatch) => {
    dispatch(getCartLoading());

    wishCollection.where("userid", "==", uid).get().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc)=> {
        temp.push(doc.data());
      })
      dispatch(getWishSuccess(temp));
    }).catch((error) => {
      dispatch(getWishError(error))
    })

  };
  export const getWishLoading = () => ({
    type: ActionTypes.WSH_GET_LOAD,
    payload: true,
  });
  export const getWishSuccess = (cartData) => ({
    type: ActionTypes.WSH_GET_SUCCESS,
    payload: cartData,
  });
  export const getWishError = (err) => ({
    type: ActionTypes.WSH_GET_ERR,
    payload: err,
  });



  export const getProduct= () => (dispatch) => {
    dispatch(getProductLoading());

    productCollection.get().then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc)=> {
        temp.push(doc.data());
      })
      dispatch(getProductSuccess(temp));
    }).catch((error) => {
      dispatch(getProductError(error))
    })

  };
  export const getProductLoading = () => ({
    type: ActionTypes.PROD_GET_LOAD,
    payload: true,
  });
  export const getProductSuccess = (cartData) => ({
    type: ActionTypes.PROD_GET_SUCCESS,
    payload: cartData,
  });
  export const getProductError = (err) => ({
    type: ActionTypes.PROD_GET_ERR,
    payload: err,
  });


  












