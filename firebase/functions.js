import firebase from "firebase";

const cartCollection = firebase.firestore().collection("cart");
const wishCollection = firebase.firestore().collection("wish");

export const addCartData = async (cartData) => {
        cartCollection.doc().set(cartData).then(() => {
            let retObj = {
                status: "success",
                err: false
            }
            return retObj;
        }).catch((error) => {
            let retObj = {
                status: "failed",
                err: error
            }
            return retObj;
        })
}

export const addWishData = async (wishData) => {
    return wishCollection.doc().set(wishData).then(() => {
        let retObj = {
            status: "success",
            err: false
        }
        return retObj;
    }).catch((error) => {
        let retObj = {
            status: "failed",
            err: error
        }
        return retObj;
    })
}

export const removeCartData = async (cid) => {
    cartCollection.where("cartid", "==", cid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let docId = doc.id;
            cartCollection.doc(docId).delete().then(() => {
                let retObj = {
                    status: "success",
                    err: false
                }
                return retObj;
            }).catch((error) => {
                let retObj = {
                    status: "failed",
                    err: error
                }
                return retObj;
            })
        })
    })
}

export const removeWishData = async (wid) => {
    cartCollection.where("wishid", "==", cid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let docId = doc.id;
            wishCollection.doc(docId).delete().then(() => {
                let retObj = {
                    status: "success",
                    err: false
                }
                return retObj;
            }).catch((error) => {
                let retObj = {
                    status: "failed",
                    err: error
                }
                return retObj;
            })
        })
    })
}