import React from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Platform,
  Easing,
  Modal,
} from "react-native";
import { ScrollView, View, Animated } from "react-native";
import { Badge, Button, Overlay, Text, Image } from "react-native-elements";
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
} from "../../../redux/ActionCreators";
import { Alert } from "react-native";
import { addCartData, getTimeEpoch } from "../../../firebase/functions";

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

class FishCatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
    };
  }

  render() {
    return (
      <View style={{ width: ScreenWidth, alignItems: "center", marginTop: 30 }}>
        <View style={{ width: ScreenWidth - 40 }}>
          <View style={{ width: ScreenWidth - 40, height: 30 }}>
            <View>
              <Text style={{ fontSize: 18, color: theme.darkTextColor }}>
                Shop Fishes
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Specific", { item: "fish" })
              }
              style={{ position: "absolute", right: 0, bottom: 5 }}
            >
              <Text style={{ fontSize: 14, color: theme.darkTextColor }}>
                {"See all >>"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigation.navigate("Specific", { item: "fish" })
            }
            style={{
              width: ScreenWidth - 40,
              // backgroundColor: "blue",
              height: 190,
              marginTop: 1,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../../../assets/fish.png")}
              style={{
                width: ScreenWidth - 40,
                height: 190,
                resizeMode: "cover",
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          {this.props.prodData.isLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}
            >
              {this.props.prodData.data
                .filter(
                  (product) =>
                    product.category === "fish" && parseInt(product.stock) > 0
                )
                .slice(0, 4)
                .map((product, key) => (
                  // <Text key={product.productId}>{product.name}</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate("ProdDetails", {
                        item: product,
                      })
                    }
                    style={{
                      width: (ScreenWidth - 50) / 2,
                      height: 230,
                      borderRadius: 20,
                      // backgroundColor: "blue",
                      backgroundColor: theme.fishBg,
                      marginRight: key % 2 === 0 ? 10 : 0,
                      marginTop: key >= 2 ? 10 : 0,
                      borderWidth: 1,
                      borderColor: theme.textOuter,
                    }}
                  >
                    <View>
                      <View
                        style={{
                          width: (ScreenWidth - 80) / 2,
                          height: 50,
                          // backgroundColor: "green",
                          borderRadius: 20,
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            height: 50,
                            // backgroundColor: "orange",
                            justifyContent: "center",
                            // marginLeft: 10
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: theme.darkTextColor,
                              textAlign: "center",
                              // backgroundColor: "pink",
                              width: (ScreenWidth - 80) / 2,
                            }}
                          >
                            {product.name}
                          </Text>
                        </View>
                        {/*<View style={{*/}
                        {/*    height: 50,*/}
                        {/*    borderRadius: 20,*/}
                        {/*    // backgroundColor: "Yellow",*/}
                        {/*    position: "absolute",*/}
                        {/*    right: 10,*/}
                        {/*    top: 10*/}
                        {/*}}>*/}
                        {/*    <Icon*/}
                        {/*        name="heart-outline"*/}
                        {/*        type="ionicon"*/}
                        {/*        color={theme.darkTextColor}*/}
                        {/*        size={26}*/}

                        {/*    />*/}
                        {/*</View>*/}
                      </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          width: (ScreenWidth - 80) / 2 - 20,
                          height: 100,
                        }}
                      >
                        <Image
                          source={{ uri: product.image }}
                          style={{
                            width: (ScreenWidth - 80) / 2 - 20,
                            height: 100,
                            resizeMode: "cover",
                            borderRadius: 10,
                          }}
                          PlaceholderContent={
                            <View
                              style={{
                                width: (ScreenWidth - 80) / 2 - 20,
                                height: 100,
                                backgroundColor: theme.fishBg,
                              }}
                            />
                          }
                        />
                      </View>
                      <View
                        style={{
                          // width: ((ScreenWidth - 80) / 2) - 50,
                          height: 20,
                          marginTop: 10,
                          // backgroundColor: "violet",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {parseInt(product.discountPercent) > 0 ? (
                          <Text
                            style={{
                              fontSize: 16,
                              textAlign: "center",
                              color: theme.badgeColor,
                              // backgroundColor: "red",
                              // flex: 1,
                              textDecorationStyle: "solid",
                              textDecorationLine: "line-through",
                              marginRight: 5,
                            }}
                          >
                            {product.price}₹
                          </Text>
                        ) : (
                          <></>
                        )}

                        <Text
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: theme.darkTextColor,
                            // flex: 1,
                          }}
                        >
                          {product.netPrice}₹
                        </Text>
                      </View>
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
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ loading: true });
                          const cartCollection = firebase
                            .firestore()
                            .collection("cart");
                          console.log("Clicked");
                          let cartData = {
                            cartid: getTimeEpoch(),
                            userid: this.props.userSystemData.data[0].userid,
                            productid: product.productId,
                            count: 1,
                          };
                          // console.error(cartData)
                          cartCollection
                            .where("productid", "==", cartData.productid)
                            .where(
                              "userid",
                              "==",
                              this.props.userSystemData.data[0].userid
                            )
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
                                    // console.error(cartData)
                                    this.props.navigation.navigate("Cart");
                                    alert("done");
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
                                    // console.error(cartData)
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
                          backgroundColor: theme.primaryDark,
                          width: (ScreenWidth - 80) / 2 - 20,
                          height: 36,
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
                        <Text
                          style={{ textAlign: "center", color: theme.mainBg }}
                        >
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FishCatComponent);
