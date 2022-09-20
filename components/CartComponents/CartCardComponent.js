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
import { ScrollView, View, Animated } from "react-native";
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
} from "../../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    userSystemData: state.userSystemData,
    cartData: state.cartData,
    wishData: state.wishData,
    prodData: state.prodData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getCart: (uid) => dispatch(getCart(uid)),
  getWish: (uid) => dispatch(getWish(uid)),
  getProduct: () => dispatch(getProduct()),
});

class CartCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _renderLine = () => (
    <View
      style={{
        width: ScreenWidth,
        height: 1,
        backgroundColor: theme.textOuter,
        marginTop: 50,
        marginBottom: 20,
      }}
    />
  );

  render() {
    let product = this.props.prodData.data.find(
      (i) => i.productId === this.props.item.productid
    );
    return (
      <View>
        <View
          style={{
            width: ScreenWidth - 20,
            marginLeft: 10,
            height: 70,
            backgroundColor: theme.decorBg,
            borderRadius: 10,
            marginBottom: 10,
            // marginTop: 10
            borderWidth: 1,
            borderColor: theme.textOuter,
          }}
        >
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
                source={require("../../assets/cartadd.gif")}
                style={{
                  width: ScreenWidth / 2,
                  height: ScreenWidth / 2,
                }}
              />
            </View>
          </Modal>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 10,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: product.image }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
            </View>
            <View style={{ marginLeft: 30, flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold", color: theme.primaryDark }}>
                {product.name}
              </Text>
              <Text style={{ color: theme.darkTextColor }}>
                ₹{product.netPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 70,
              height: 30,
              // backgroundColor: "red",
              position: "absolute",
              right: 10,
              top: 18,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: theme.textOuter,
              borderRadius: 10,
            }}
          >
            {this.props.item.count === 1 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({ loading: true });
                  let cartCollection = firebase.firestore().collection("cart");
                  cartCollection
                    .where("cartid", "==", this.props.item.cartid)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        let docId = doc.id;
                        cartCollection
                          .doc(docId)
                          .delete()
                          .then(() => {
                            this.setState({ loading: false });
                            this.props.getCart(
                              this.props.userSystemData.data[0].userid
                            );
                          })
                          .catch((error) => {
                            alert("error");
                            this.state({ loading: false });
                          });
                      });
                    });
                }}
                style={{
                  backgroundColor: theme.textOuter,
                  flex: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="trash" type="ionicon" color={"grey"} size={12} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true });
                  let cartCollection = firebase.firestore().collection("cart");
                  cartCollection
                    .where("cartid", "==", this.props.item.cartid)
                    .get()
                    .then((querySnapshot) => {
                      let count = 0;
                      querySnapshot.forEach((doc) => {
                        let docId = doc.id;
                        count = doc.data().count - 1;
                        cartCollection
                          .doc(docId)
                          .set({ count: count }, { merge: true })
                          .then(() => {
                            this.setState({ loading: false });
                            this.props.getCart(
                              this.props.userSystemData.data[0].userid
                            );
                          })
                          .catch((error) => {
                            alert("error");
                            this.state({ loading: false });
                          });
                      });
                    });
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: theme.textOuter,
                  flex: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "grey", fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                backgroundColor: theme.textBg,
                flex: 1.3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{this.props.item.count}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ loading: true });
                let cartCollection = firebase.firestore().collection("cart");
                cartCollection
                  .where("cartid", "==", this.props.item.cartid)
                  .get()
                  .then((querySnapshot) => {
                    let count = 0;
                    querySnapshot.forEach((doc) => {
                      let docId = doc.id;
                      count = doc.data().count + 1;
                      cartCollection
                        .doc(docId)
                        .set({ count: count }, { merge: true })
                        .then(() => {
                          this.setState({ loading: false });
                          this.props.getCart(
                            this.props.userSystemData.data[0].userid
                          );
                        })
                        .catch((error) => {
                          alert("error");
                          this.state({ loading: false });
                        });
                    });
                  });
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: theme.decorColor,
                flex: 1,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.lightTextColor, fontWeight: "bold" }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCardComponent);
