import React from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Easing,
  Linking,
  Modal,
} from "react-native";
import { ScrollView, View, Animated } from "react-native";
import { Badge, Button, Overlay, Text } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../../Dimensions/defaults";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../../Dimensions/dimensions";

import {
  getUser,
  getCart,
  getWish,
  getProduct,
  getOrders,
} from "../../../redux/ActionCreators";
import { Alert } from "react-native";
import { getTimeEpoch } from "../../../firebase/functions";

const mapStateToProps = (state) => {
  return {
    userSystemData: state.userSystemData,
    cartData: state.cartData,
    wishData: state.wishData,
    prodData: state.prodData,
    orderData: state.orderData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getCart: (uid) => dispatch(getCart(uid)),
  getWish: (uid) => dispatch(getWish(uid)),
  getProduct: () => dispatch(getProduct()),
  getOrders: (uid) => dispatch(getOrders(uid)),
});

class ProdDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      loading: false,
    };
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.loading}
          statusBarTranslucent={true}
        >
          <View
            style={{
              width: ScreenWidth,
              height: ScreenHeight,
              backgroundColor: "#444444",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/cartadd.gif")}
              style={{
                width: ScreenWidth / 2,
                height: ScreenWidth / 2,
              }}
            />
          </View>
        </Modal>
        <View
          style={{
            position: "absolute",
            top: ScreenHeight - 150,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true });
              const cartCollection = firebase.firestore().collection("cart");
              console.log("Clicked");
              let cartData = {
                cartid: getTimeEpoch(),
                userid: this.props.userSystemData.data[0].userid,
                productid: this.state.item.productId,
                count: 1,
              };
              cartCollection
                .where("productid", "==", cartData.productid)
                .get()
                .then((querySnapshot) => {
                  let docID = "";
                  let count = 0;

                  querySnapshot.forEach((doc) => {
                    docID = doc.id;
                    count = doc.data().count;
                  });
                  if (count > 0) {
                    cartCollection
                      .doc(docID)
                      .set({ count: count + 1 }, { merge: true })
                      .then(() => {
                        this.props.getCart(
                          this.props.userSystemData.data[0].userid
                        );
                        this.setState({ loading: false });
                        this.props.navigation.navigate("Cart");
                      })
                      .catch((error) => {
                        this.setState({ loading: false });
                        console.error(error);
                      });
                  } else {
                    cartCollection
                      .doc()
                      .set(cartData)
                      .then(() => {
                        this.props.getCart(
                          this.props.userSystemData.data[0].userid
                        );
                        this.setState({ loading: false });
                        this.props.navigation.navigate("Cart");
                      })
                      .catch((error) => {
                        alert("Error");
                        this.setState({ loading: false });
                        console.error(error);
                      });
                  }
                });
            }}
            style={{
              backgroundColor: theme.decorColor,
              width: ScreenWidth - 40,
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
            <Text style={{ textAlign: "center", color: theme.mainBg }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30, marginLeft: 20 }}>
          <Text style={{ fontSize: 17, color: theme.primaryDark }}>
            {this.state.item.name}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: ScreenWidth - 40,
            height: ScreenWidth - 40,
            // backgroundColor: "red",
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          <Image
            source={{ uri: this.state.item.image }}
            style={{
              width: ScreenWidth - 40,
              height: ScreenWidth - 40,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              // width: 50,
              // height: 30,
              backgroundColor: theme.badgeColor,
              position: "absolute",
              top: -20,
              right: -10,
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text
              style={{ color: theme.mainBg, fontSize: 12, fontWeight: "bold" }}
            >
              {this.state.item.discountPercent}% Off
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: "row" }}>
          <Text style={{ color: theme.lightTextColor, flex: 1 }}>
            Available as {this.state.item.quantity}.
          </Text>
          <View
            style={{
              // width: ((ScreenWidth - 80) / 2) - 50,
              height: 20,
              // marginTop: 10,
              // backgroundColor: "violet",
              marginLeft: 20,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginRight: 20,
              }}
            >
              <Text
                ellipsizeMode="tail"
                style={{
                  fontSize: 16,
                  textAlign: "right",
                  color: theme.primaryDark,
                  marginRight: 10,
                  // fontWeight: "bold"
                  // flex: 1,
                }}
              >
                Price:
              </Text>
              {parseInt(this.state.item.discountPercent) > 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "right",
                    color: theme.badgeColor,
                    // backgroundColor: "red",
                    // flex: 1,
                    textDecorationStyle: "solid",
                    textDecorationLine: "line-through",
                    marginRight: 5,
                  }}
                >
                  ₹{this.state.item.price}
                </Text>
              ) : (
                <></>
              )}

              <Text
                ellipsizeMode="tail"
                style={{
                  fontSize: 16,
                  textAlign: "right",
                  color: theme.darkTextColor,
                  // flex: 1,
                }}
              >
                ₹{this.state.item.netPrice}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.decorBg,
            // backgroundColor: "red",
            padding: 10,
            width: ScreenWidth - 40,
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 20,
          }}
        >
          <View style={{ marginLeft: 10, marginTop: 0 }}>
            <Text style={{ color: theme.primaryDark, fontSize: 17 }}>
              Description:
            </Text>
          </View>
          <View style={{ marginLeft: 10, marginTop: 3 }}>
            <Text style={{ color: theme.darkTextColor, fontSize: 15 }}>
              {this.state.item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProdDetailsComponent);
