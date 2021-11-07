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
    getProduct,
} from "../../redux/ActionCreators";
import CartCardComponent from "./CartCardComponent";
import {getTimeEpoch} from "../../firebase/functions";

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


class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderLine = () => (
        <View style={{
            width: ScreenWidth,
            height: 1,
            backgroundColor: theme.textOuter,
            marginTop: 50,
            marginBottom: 20
        }}/>
    )


    render() {
        let total = 0;
        this.props.cartData.data.forEach((item) => {
            let product = this.props.prodData.data.find(i => i.productId === item.productid)
            total += product.netPrice * item.count
        })
        console.log(total)
        return (

            <ScrollView>
                {this.props.cartData.data.length > 0 && !this.props.cartData.isLoading ?
                    <View style={{marginTop: 30, alignItems: "center"}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: theme.decorColor,
                                width: ScreenWidth -20, height: 50, borderRadius: 10,
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
                            }}>
                            <Text style={{textAlign: "center", color: theme.mainBg, fontWeight :"bold"}}>
                                Proceed to Checkout
                            </Text>
                        </TouchableOpacity>
                    </View>

                    : <></>
                }

                {this.props.cartData.data.length === 0 && !this.props.cartData.isLoading ?

                    <View style={{width: ScreenWidth, height: ScreenHeight, backgroundColor: "#FDFDFD"}}>
                        <Image source={require("../../assets/empty-cart.gif")}
                               style={{width: ScreenWidth, height: 200, marginTop: 50}}/>
                    </View>
                    : <></>
                }
                {
                    this.props.cartData.isLoading ?
                        <View style={{marginTop: 30}}>
                            <ActivityIndicator color={theme.primaryDark}/>
                        </View> :
                        <View>
                            <View style={{marginTop: 20}}>
                                {this.props.cartData.data.map((item, key) => (
                                    <CartCardComponent item={item} key={key}/>
                                ))}
                            </View>
                            {this.props.cartData.data.length > 0 && !this.props.cartData.isLoading ?
                                <View style={{
                                    marginTop: 10, backgroundColor: theme.decorBg, borderWidth: 1,
                                    borderColor: theme.textOuter, padding: 10, borderRadius: 10,
                                    alignItems: "flex-end", width: ScreenWidth-20, marginLeft: 10
                                }}>
                                    <Text style={{color: theme.darkTextColor, fontWeight: "bold"}}>Total: ₹{total}</Text>
                                </View>: <></>
                            }

                        </View>

                }



            </ScrollView>


        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
