import React from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Easing,
  Modal,
} from "react-native";
import { SafeAreaView, ScrollView, View, Animated } from "react-native";
import { Badge, Button, Overlay, Text } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../Dimensions/defaults";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../Dimensions/dimensions";

import {
  getUser,
  getCart,
  getWish,
  getProduct,
  getAddress,
  getOrders,
} from "../../redux/ActionCreators";
import { getTimeEpoch } from "../../firebase/functions";
import axios from "axios";
import emailjs from "emailjs-com";

const mapStateToProps = (state) => {
  return {
    userSystemData: state.userSystemData,
    cartData: state.cartData,
    wishData: state.wishData,
    prodData: state.prodData,
    addressData: state.addressData,
    orderData: state.orderData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getCart: (uid) => dispatch(getCart(uid)),
  getWish: (uid) => dispatch(getWish(uid)),
  getProduct: () => dispatch(getProduct()),
  getAddress: (uid) => dispatch(getAddress(uid)),
  getOrders: (uid) => dispatch(getOrders(uid)),
});

class AddAddressComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.item.name,
      phoneno: this.props.route.params.item.phoneno,
      address: this.props.route.params.item.address,
      district: this.props.route.params.item.district,
      pincode: this.props.route.params.item.pincode,
      state: this.props.route.params.item.state,
      locationError: false,
      available: this.props.route.params.item.available,
      loading: false,
      checkingDelivery: true,
    };
  }
  componentDidMount() {
    this.checkDelivery();
  }

  checkDelivery = () => {
    this.setState({ checkingDelivery: true });
    setTimeout(() => {
      let options = {
        method: "POST",
        url: "https://pincode.p.rapidapi.com/",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key":
            "270a5bcb65msh877d6ff7f5533c0p19a716jsna517e32edc05",
          "x-rapidapi-host": "pincode.p.rapidapi.com",
        },
        data: { searchBy: "pincode", value: this.state.pincode },
      };
      axios
        .request(options)
        .then((response) => {
          this.setState({ checkingDelivery: false });
          if (response.data.length > 0) {
            if (response.data[0].district === "Tirunelveli") {
              this.setState({
                locationError: false,
                district: response.data[0].district,
                state: response.data[0].circle,
              });
              console.log("Yes Service");
            } else {
              this.setState({
                locationError: true,
                district: response.data[0].district,
                state: response.data[0].circle,
              });
              console.log("No Service");
            }
          } else {
            this.setState({ locationError: true });
            console.log("No Service");
          }
        })
        .catch((error) => {
          this.setState({ locationError: true, checkingDelivery: false });
          console.log("No Service");
        });
    }, 2000);
  };

  updateAndPlaceOrder = () => {
    this.setState({ loading: true });
    console.log("Called");
    if (this.state.available) {
      let addressId = this.props.addressData.data[0].addressId;
      firebase
        .firestore()
        .collection("address")
        .where("addressId", "==", addressId)
        .get()
        .then((querySnapshot) => {
          let docId = "";
          querySnapshot.forEach((doc) => {
            docId = doc.id;
          });
          let setData = {
            name: this.state.name,
            phoneno: this.state.phoneno,
            address: this.state.address,
            district: this.state.district,
            state: this.state.state,
            servicable: !this.state.locationError,
            pincode: this.state.pincode,
          };
          firebase
            .firestore()
            .collection("address")
            .doc(docId)
            .set(setData, { merge: true })
            .then(() => {
              this.props.getAddress(this.props.userSystemData.data[0].userid);
              let cartProducts = [];
              this.props.cartData.data.forEach((val) => {
                let temp = this.props.prodData.data.filter(
                  (i) => i.productId === val.productid
                );
                let prodObj = {
                  discountPercent: temp[0].discountPercent,
                  image: temp[0].image,
                  netPrice: temp[0].netPrice,
                  number: val.count,
                  price: temp[0].price,
                  quantity: temp[0].quantity,
                  stock: temp[0].stock,
                  name: temp[0].name,
                };
                cartProducts.push(prodObj);
              });
              let orderId = getTimeEpoch();
              let setOrderData = {
                address: {
                  addressId: addressId,
                  district: this.state.district,
                  doorno: "",
                  lineOne: this.state.address,
                  lineTwo: "",
                  name: this.state.name,
                  phoneno: this.state.phoneno,
                  pincode: this.state.pincode,
                  state: this.state.state,
                  userid: this.props.userSystemData.data[0].userid,
                  servicable: !this.state.locationError,
                },
                addressOg: {
                  addressId: "",
                  district: "",
                  doorno: "",
                  lineOne: "",
                  lineTwo: "",
                  name: "",
                  phoneno: "",
                  pincode: "",
                  state: "",
                  userid: "",
                },
                products: cartProducts,
                status: "Order Placed",
                timestamp: firebase.firestore.Timestamp.now(),
                userid: this.props.userSystemData.data[0].userid,
                id: orderId,
              };
              firebase
                .firestore()
                .collection("orders")
                .doc()
                .set(setOrderData)
                .then(() => {
                  if (!this.state.locationError) {
                    this.sendEmails({ orderId: orderId });
                  }
                  this.props.getOrders(
                    this.props.userSystemData.data[0].userid
                  );
                  this.props.cartData.data.forEach((item) => {
                    firebase
                      .firestore()
                      .collection("cart")
                      .where("cartid", "==", item.cartid)
                      .get()
                      .then((querySnapshot) => {
                        let docId = "";
                        querySnapshot.forEach((doc) => {
                          docId = doc.id;
                        });
                        firebase
                          .firestore()
                          .collection("cart")
                          .doc(docId)
                          .delete()
                          .then(() => {
                            console.log("Deleted");
                            this.props.getCart(
                              this.props.userSystemData.data[0].userid
                            );
                          });
                      });
                  });
                  this.setState({ loading: false });
                  // alert("Success")
                  this.props.navigation.navigate("Profile");
                })
                .catch((error) => {
                  console.log(error);
                  alert("Error Placing the order");
                  this.setState({ loading: false });
                });
            })
            .catch((error) => {
              console.error(error);
              alert("Processing Error");
              this.setState({ loading: false });
            });
        })
        .catch((error) => {
          console.error(error);
          alert("Processing Error");
        });
    } else {
      let addressId = getTimeEpoch();
      let setData = {
        addressId: addressId,
        name: this.state.name,
        phoneno: this.state.phoneno,
        address: this.state.address,
        district: this.state.district,
        state: this.state.state,
        servicable: !this.state.locationError,
        userid: this.props.userSystemData.data[0].userid,
        pincode: this.state.pincode,
      };
      firebase
        .firestore()
        .collection("address")
        .doc()
        .set(setData)
        .then(() => {
          this.props.getAddress(this.props.userSystemData.data[0].userid);
          let cartProducts = [];
          this.props.cartData.data.forEach((val) => {
            let temp = this.props.prodData.data.filter(
              (i) => i.productId === val.productid
            );
            let prodObj = {
              discountPercent: temp[0].discountPercent,
              image: temp[0].image,
              netPrice: temp[0].netPrice,
              number: val.count,
              price: temp[0].price,
              quantity: temp[0].quantity,
              stock: temp[0].stock,
              name: temp[0].name,
            };
            cartProducts.push(prodObj);
          });
          // console.log(this.props.prodData.data[0])
          let orderId = getTimeEpoch();
          let setOrderData = {
            address: {
              addressId: addressId,
              district: this.state.district,
              doorno: "",
              lineOne: this.state.address,
              lineTwo: "",
              name: this.state.name,
              phoneno: this.state.phoneno,
              pincode: this.state.pincode,
              state: this.state.state,
              userid: this.props.userSystemData.data[0].userid,
              orderId: getTimeEpoch(),
              servicable: !this.state.locationError,
            },
            addressOg: {
              addressId: "",
              district: "",
              doorno: "",
              lineOne: "",
              lineTwo: "",
              name: "",
              phoneno: "",
              pincode: "",
              state: "",
              userid: "",
            },
            products: cartProducts,
            status: "Order Placed",
            timestamp: firebase.firestore.Timestamp.now(),
            userid: this.props.userSystemData.data[0].userid,
            id: orderId,
          };
          firebase
            .firestore()
            .collection("orders")
            .doc()
            .set(setOrderData)
            .then(() => {
              if (!this.state.locationError) {
                this.sendEmails({ orderId: orderId });
              }

              this.props.getOrders(this.props.userSystemData.data[0].userid);
              this.props.cartData.data.forEach((item) => {
                firebase
                  .firestore()
                  .collection("cart")
                  .where("cartid", "==", item.cartid)
                  .get()
                  .then((querySnapshot) => {
                    let docId = "";
                    querySnapshot.forEach((doc) => {
                      docId = doc.id;
                    });
                    firebase
                      .firestore()
                      .collection("cart")
                      .doc(docId)
                      .delete()
                      .then(() => {
                        console.log("Deleted");
                        this.props.getCart(
                          this.props.userSystemData.data[0].userid
                        );
                      });
                  });
              });
              this.setState({ loading: false });
              // alert("Success")
              this.props.navigation.navigate("Profile");
            })
            .catch((error) => {
              console.log(error);
              alert("Error Placing the order");
              this.setState({ loading: false });
            });
        })
        .catch((error) => {
          alert("Processing Error");
          console.log(error);
          this.setState({ loading: false });
        });
    }
  };
  sendEmails = ({ orderId }) => {
    console.log("Called");
    let address =
      this.state.name +
      "\n" +
      this.state.address +
      "," +
      "\n" +
      this.state.district +
      " - " +
      this.state.pincode +
      "\n" +
      this.state.state;
    let products = "";
    let count = 1;
    this.props.cartData.data.forEach((val) => {
      let temp = this.props.prodData.data.filter(
        (i) => i.productId === val.productid
      );
      let prodObj = {
        netPrice: temp[0].netPrice,
        number: val.count,
        quantity: temp[0].quantity,
        total: parseInt(temp[0].netPrice) * val.count,
        name: temp[0].name,
      };
      let prodTemp =
        count++ +
        ". " +
        prodObj.name +
        " " +
        "₹" +
        prodObj.netPrice +
        " x " +
        prodObj.number +
        " -- " +
        "₹" +
        prodObj.total;
      // console.log(prodTemp)
      products += prodTemp + "   |   ";
    });
    // console.log(products);
    let templateSelfParam = {
      service_id: "Jim_aquarium",
      template_id: "Jim_self",
      user_id: "user_Fshle7lhIGd5UAZiXexYL",
      id: orderId,
      to_email: "jimaquarium@gmail.com",
      accessToken: "7717287bb3920229e72ce310ae21e85c",
      address: address,
      phone: this.state.phoneno,
      products: products,
    };
    let templateClientParam = {
      service_id: "Jim_aquarium",
      template_id: "Jim_customer",
      user_id: "user_Fshle7lhIGd5UAZiXexYL",
      id: orderId,
      to_email: this.props.userSystemData.data[0].email,
      accessToken: "7717287bb3920229e72ce310ae21e85c",
      address: address,
      products: products,
    };
    emailjs
      .send(
        "Jim_aquarium",
        "Jim_self",
        templateSelfParam,
        "user_Fshle7lhIGd5UAZiXexYL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    emailjs
      .send(
        "Jim_aquarium",
        "Jim_customer",
        templateClientParam,
        "user_Fshle7lhIGd5UAZiXexYL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  render() {
    let pincode = "";
    return (
      <ScrollView>
        <Modal
          animationType="fade"
          transparent={false}
          // visible={true}
          visible={this.state.loading}
          statusBarTranslucent={true}
        >
          <View
            style={{
              width: ScreenWidth,
              height: ScreenHeight,
              backgroundColor: theme.mainBg,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/loading.gif")}
              style={{
                width: ScreenWidth / 2,
                height: ScreenWidth / 2,
                borderRadius: 50,
                overlayColor: theme.mainBg,

                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            />
          </View>
        </Modal>

        <View style={{ marginTop: 30, alignItems: "center" }}>
          <View
            style={{
              width: ScreenWidth - 50,
              height: 40,
              // backgroundColor: theme.textBg,
              // borderRadius: 20,
              // borderWidth: 1,
              // borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: theme.decorColor,
                fontSize: 18,
              }}
            >
              Add Shipping Address
            </Text>
          </View>
          <View
            style={{
              width: ScreenWidth - 100,
              height: 40,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 40,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              value={this.state.name}
              placeholder={"Full Name"}
              onChangeText={(val) => this.setState({ name: val })}
            />
          </View>
          <View
            style={{
              width: ScreenWidth - 100,
              height: 40,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 40,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              value={this.state.phoneno}
              placeholder={"Phone Number"}
              keyboardType={"numeric"}
              onChangeText={(val) => this.setState({ phoneno: val })}
            />
          </View>
          <View
            style={{
              width: ScreenWidth - 100,
              height: 40,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 40,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              onBlur={() => {
                this.checkDelivery();
              }}
              value={this.state.pincode}
              placeholder={"Pincode"}
              keyboardType={"numeric"}
              onChangeText={(val) => {
                this.setState({ pincode: val });
                pincode = val;
              }}
            />
          </View>
          {this.state.locationError && (
            <View
              style={{
                marginTop: 0,
                width: ScreenWidth - 100,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  color: theme.badgeColor,
                  fontWeight: "normal",
                }}
              >
                This Location may not be servicable
              </Text>
            </View>
          )}

          <View
            style={{
              width: ScreenWidth - 100,
              height: 90,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 90,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              multiline={true}
              value={this.state.address}
              placeholder={"Address"}
              onChangeText={(val) => this.setState({ address: val })}
            />
          </View>
          <View
            style={{
              width: ScreenWidth - 100,
              height: 40,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 40,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              value={this.state.district}
              placeholder={"District"}
              onChangeText={(val) => this.setState({ district: val })}
            />
          </View>

          <View
            style={{
              width: ScreenWidth - 100,
              height: 40,
              marginTop: 20,
              backgroundColor: theme.textBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.textOuter,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: ScreenWidth - 100,
                height: 40,
                backgroundColor: theme.textBg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.textOuter,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme.darkTextColor,
              }}
              value={this.state.state}
              placeholder={"State"}
              onChangeText={(val) => this.setState({ state: val })}
            />
          </View>

          <View style={{ marginTop: 30, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.locationError) {
                  alert("This Location may not be servicable");
                } else {
                  this.updateAndPlaceOrder();
                }
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: this.state.checkingDelivery
                  ? theme.lightTextColor
                  : theme.decorColor,
                width: ScreenWidth - 100,
                height: 50,
                borderRadius: 10,
                marginTop: 5,
                justifyContent: "center",

                shadowColor: theme.primaryDark,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              {this.state.checkingDelivery ? (
                <ActivityIndicator color={theme.decorColor} />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.mainBg,
                    fontWeight: "bold",
                  }}
                >
                  Place the Order
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddressComponent);
