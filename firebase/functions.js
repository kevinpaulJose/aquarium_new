import firebase from "firebase";

const cartCollection = firebase.firestore().collection("cart");
const wishCollection = firebase.firestore().collection("wish");

export const addCartData = async (cartData) => {
    cartCollection.where("productid", "==", cartData.productid)
        .get().then((querySnapshot) => {
            let docID = "";
            let count = 0;

                querySnapshot.forEach((doc) => {
                    docID = doc.id;
                    count = doc.data().count;
                })
        if(count > 0) {
                cartCollection.doc(docID).set({count: count + 1}, {merge: true})
            }
            else {
                cartCollection.doc().set(cartData).then(() => {
                    let retObj = {
                        status: "success",
                        err: false
                    }
                    console.log("Done")
                    return retObj;
                }).catch((error) => {
                    let retObj = {
                        status: "failed",
                        err: error
                    }
                    console.log("error")
                    return retObj;
                })
            }

    })

}
export const getTimeEpoch = () => {
    return new Date().getTime().toString();
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