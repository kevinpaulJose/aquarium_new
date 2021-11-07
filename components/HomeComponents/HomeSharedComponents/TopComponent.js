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

    componentDidMount() {
        getCart(this.props.userSystemData.data.userid);
        // console.log(this.props.cartData);
        // console.log(this.props.userSystemData)
    }


    render() {
        return (
            <SafeAreaView style={{
                backgroundColor: theme.mainBg
                // backgroundColor: "red"
            }}>
                <View style={{
                    width: ScreenWidth,
                    height: 70,
                    backgroundColor: theme.mainBg,
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingTop: 10,
                    marginTop: Platform.OS === 'ios' ? 0 : NotchHeight,
                    alignSelf: "center",
                }}>
                    {!this.props.back ?
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
                                name="log-out-outline"
                                type="ionicon"
                                color={theme.darkTextColor}
                                size={26}
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

                            />
                        </View>
                        :
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
                                name="chevron-back-outline"
                                type="ionicon"
                                color={theme.darkTextColor}
                                size={26}
                                onPress={() => {
                                    this.props.navigation.pop()
                                }
                                }

                            />
                        </View>
                    }
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
                                onPress={() => this.props.navigation.navigate("Cart")}

                            />
                            {this.props.cartData.data.length > 0 &&
                            <Badge value={this.props.cartData.data.length} containerStyle={{position: "absolute", top: -5, right: -5}}
                                   badgeStyle={{
                                       backgroundColor: theme.badgeColor,
                                       width: 20,
                                       height: 20,
                                       borderRadius: 100
                                   }}
                            />
                            }

                        </View>
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopComponentHome);
