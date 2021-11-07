import * as ActionTypes from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import firebase from 'firebase'
import User from "../datatypes/user";
import "../firebase/config"

const userCollection = firebase.firestore().collection("users");
const cartCollection = firebase.firestore().collection("cart");
const wishCollection = firebase.firestore().collection("wish");
const productCollection = firebase.firestore().collection("products");

// export const createUser = (email, password, username) => (dispatch) => {
//   dispatch(createUserLoading());
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       let userToUpload = {
//         userid: user.uid,
//         email: user.email,
//         username: username
//       }
//       userCollection.doc().set(userToUpload).then(() => {
//         dispatch(createUserSuccess(userToUpload));
//       }).catch((error) => {
//         dispatch(createUserError(error));
//       })
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       dispatch(createUserError(error));
//       // ..
//     });
// };
// export const createUserLoading = () => ({
//   type: ActionTypes.USR_CREATE_LOAD,
//   payload: true,
// });
// export const createUserSuccess = (user) => ({
//   type: ActionTypes.USR_CREATE_SUCCESS,
//   payload: user,
// });
// export const createUserError = (err) => ({
//   type: ActionTypes.USR_CREATE_ERR,
//   payload: err,
// });










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







// export const signinUser = (email, password) => (dispatch) => {
//   dispatch(createUserLoading());

//   firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
//     userCollection.where("userid", "==", user.user.uid).get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         dispatch(createUserSuccess(doc.data()));
//       })
//     }).catch((error) => {
//       dispatch(createUserError(error));
//     })
//   }).catch((error) => {
//     dispatch(createUserError(error));
//   })
// }







//   export const signoutUser = () => (dispatch) => {
//     dispatch(outUserLoading());

//     firebase.auth().signOut().then(() => {
//     dispatch(outUserSuccess());
// }).catch((error) => {
//     dispatch(outUserError(error));
// });

  // };
  // export const outUserLoading = () => ({
  //   type: ActionTypes.USR_OUT_LOAD,
  //   payload: true,
  // });
  // export const outUserSuccess = () => ({
  //   type: ActionTypes.USR_OUT_SUCCESS,
  //   payload: true,
  // });
  // export const outUserError = (err) => ({
  //   type: ActionTypes.USR_OUT_ERR,
  //   payload: err,
  // });







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


  












