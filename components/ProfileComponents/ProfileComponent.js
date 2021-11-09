import React from "react";
import {
    ActivityIndicator,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Easing, Linking,
} from "react-native";
import {SafeAreaView, ScrollView, View, Animated} from "react-native";
import {Badge, Button, Overlay, Text} from "react-native-elements";
import {connect} from "react-redux";
import {theme} from "../Dimensions/defaults";
import {Icon} from "react-native-elements";
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
    getProduct, getOrders,
} from "../../redux/ActionCreators";
import {Alert} from "react-native";

const userCollection = firebase.firestore().collection("users");
const mapStateToProps = (state) => {
    return {
        userSystemData: state.userSystemData,
        cartData: state.cartData,
        wishData: state.wishData,
        prodData: state.prodData,
        orderData: state.orderData
    };
};

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
    getCart: (uid) => dispatch(getCart(uid)),
    getWish: (uid) => dispatch(getWish(uid)),
    getProduct: () => dispatch(getProduct()),
    getOrders: (uid) => dispatch(getOrders(uid))
});

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getCart(this.props.userSystemData.data.userid);
        // console.log(this.props.cartData);
        // console.log(this.props.userSystemData)
    }


    _logOutComponent = () => (
        <TouchableOpacity activeOpacity={0.8}
                          onPress={() => {
                              Alert.alert(
                                  "Log Out",
                                  "Are you sure you need to Log out?",
                                  [
                                      {
                                          text: "Log out",
                                          onPress: () => {
                                              firebase.auth().signOut().then(() => {
                                                  this.props.getUser();
                                              }).catch((error) => {
                                                  console.error(error);
                                              })
                                          },
                                          style: "destructive"
                                      },
                                      {
                                          text: "Nah, Stay in Water",
                                          onPress: () => console.log("Cancel Pressed"),
                                          style: "cancel"
                                      }
                                  ]
                              );

                          }}
                          style={{marginTop: 30, alignItems: "center"}}>
            <View style={{
                width: ScreenWidth - 50,
                borderRadius: 20,
                height: 50,
                borderWidth: 1,
                borderColor: theme.badgeColor,
                backgroundColor: "#f6f0f0",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{fontSize: 17, color: theme.badgeColor}}>Log Out</Text>
            </View>

        </TouchableOpacity>
    )

    _renderOrder = () => (
        <View style={{
            width: (ScreenWidth - 50),
            // height: 230,
            borderRadius: 20,
            backgroundColor: theme.textBg,
            borderWidth: 1,
            borderColor: theme.textOuter,
            marginLeft: 25,
            marginTop: 30,
            marginBottom: 30
        }}>
            <View
                style={{marginTop: 10, alignItems: "center"}}
            >
                <Text style={{fontSize: 18, fontWeight: "bold", color: theme.primaryDark}}>Your Orders</Text>
            </View>

            <View style={{width: ScreenWidth - 70, marginLeft: 10, marginBottom: 20, backgroundColor: theme.textBg, borderRadius: 20}}>
                {this.props.orderData.data.map((item, key) => (
                    this._renderOrderCard({item: item}, {key: key})
                ))}
            </View>
        </View>
    )

    _renderOrderCard = ({item}, {key}) => (
        <View key={key} style={{marginTop: 10}}>
            <View style={{
                height: 1,
                width: ScreenWidth - 70,
                backgroundColor: theme.textOuter,
                marginTop: 10,
                alignSelf: "center"
            }}/>
            <View style={{
                width: 30,
                height: 30,
                // backgroundColor: theme.textBg,
                justifyContent: "center",
                borderRadius: 10,
                borderColor: theme.textOuter,
                // borderColor: "#25D366",
                borderWidth: 1,
                position: "absolute",
                right: 0,
                zIndex: 100,
                top: 20
            }}>
                <Icon
                    name="logo-whatsapp"
                    type="ionicon"
                    // color={theme.lightTextColor}
                    color={"#25D366"}
                    size={16}
                    onPress={() => {
                        console.log(item.id)
                        let messageURL = "https://wa.me/%2B919442964818?text=Hi,%20I%20need%20help%20with%20this%20order%20"+item.id
                        Linking.openURL(messageURL);
                    }
                    }
                />
            </View>
            <Text style={{fontWeight: "normal", fontSize: 10, color: theme.primaryDark}}>Order #{item.id}</Text>
            {!item.address.servicable &&
            <Text style={{fontWeight: "normal", fontSize: 10, color: theme.badgeColor}}>This order may not be servicable.</Text>
            }
            {item.products.map((i, k) => {
                console.log(i.image)
                return (
                    <View style={{
                        width: ScreenWidth - 80,
                        height: 60,
                        backgroundColor: theme.textBg,
                        marginTop: 5,
                        flexDirection: "row",
                        borderRadius: 10,
                        // borderColor: theme.textOuter,
                        // borderWidth: 1
                        // alignItems: "center"
                    }}>
                        <View style={{width: 50, height: 50, marginTop: 5, marginLeft: 5}}>
                            <Image source={{uri: i.image}} style={{
                                width: 50, height: 50, resizeMode: "cover",
                                borderRadius: 10
                            }}/>
                        </View>
                        <View style={{flexDirection: "column", marginLeft: 5}}>
                            <View style={{marginTop: 5, marginLeft: 5, flexDirection: "row"}}>
                                <Text style={{color: theme.darkTextColor}}>{i.name}</Text>
                                <Text style={{marginLeft: 5, color: theme.lightTextColor}}>(₹{i.number*i.netPrice})</Text>
                            </View>
                            <View style={{marginTop: 5, marginLeft: 5}}>
                                <Text style={{color: theme.lightTextColor}}>x {i.number}</Text>
                            </View>
                        </View>
                        {/*<View style={{flexDirection: "column-reverse", alignItems: "flex-end", backgroundColor: "red"}}>*/}
                        {/*    <Text>{i.number*i.netPrice}</Text>*/}
                        {/*</View>*/}

                    </View>
                )
            })}
            <Text style={{color: theme.primaryDark, marginTop: 10, textAlign: "right"}}>Status: {item.status}</Text>
        </View>
    )


    render() {
        return (
            <ScrollView>
                <this._logOutComponent/>
                {this.props.orderData.isLoading &&
                <View style={{marginTop: 20}}>
                    <ActivityIndicator color={theme.primaryDark}/>
                </View>
                }
                <this._renderOrder/>

            </ScrollView>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
