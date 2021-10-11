import React from "react";
import {
    ActivityIndicator,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Easing,
} from "react-native";
import {SafeAreaView, ScrollView, View, Animated} from "react-native";
import {Badge, Button, Overlay, Text} from "react-native-elements";
import {connect} from "react-redux";
import {theme} from "../../Dimensions/defaults";
import {Icon} from "react-native-elements";
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
import {Alert} from "react-native";

const userCollection = firebase.firestore().collection("users");
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

class TopComponentHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={{
                width: ScreenWidth,
                height: 70,
                // backgroundColor: "red",
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: 10
            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: theme.textBg,
                    justifyContent: "center",
                    borderRadius: 20,
                    borderColor: theme.textOuter,
                    borderWidth: 1
                }}>
                    <Icon
                        name="person-outline"
                        type="ionicon"
                        color={theme.darkTextColor}
                        size={26}
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                this.props.getUser();
                            }).catch((error) => {
                                console.error(error);
                            })
                        }}

                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    width: (ScreenWidth / 2) + 60,
                    height: 50,
                    // backgroundColor: "orange",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>JIM</Text>
                    <Text style={{
                        marginLeft: 5,
                        fontSize: 18,
                        color: theme.primaryDark,
                        fontWeight: "bold"
                    }}>Aquarium</Text>
                </View>
                <View style={{width: 50, height: 50}}>
                    <View style={{
                        width: 50,
                        height: 50,
                        backgroundColor: theme.textBg,
                        justifyContent: "center",
                        borderRadius: 20,
                        borderColor: theme.textOuter,
                        borderWidth: 1
                    }}>
                        <Icon
                            name="cart-outline"
                            type="ionicon"
                            color={theme.darkTextColor}
                            size={26}

                        />
                        <Badge value={2} containerStyle={{position: "absolute", top: -5, right: -5}}
                               badgeStyle={{
                                   backgroundColor: theme.badgeColor,
                                   width: 20,
                                   height: 20,
                                   borderRadius: 100
                               }}
                        />
                    </View>
                </View>
            </View>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopComponentHome);
