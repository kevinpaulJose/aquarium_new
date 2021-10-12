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
import {Alert} from "react-native";
import TopComponentHome from "./HomeSharedComponents/TopComponent";
import FishCatComponent from "./HomeSharedComponents/FishCatComponent";
import TankCatComponent from "./HomeSharedComponents/TankCatComponent";
import AccCatComponent from "./HomeSharedComponents/AccCatComponent";

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


class HomeComponent extends React.Component {
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
        return (
            <SafeAreaView style={{backgroundColor: theme.mainBg}}>
                <TopComponentHome/>
                <ScrollView>
                    <FishCatComponent/>
                    <this._renderLine />
                    <TankCatComponent/>
                    <this._renderLine />
                    <AccCatComponent/>
                </ScrollView>
            </SafeAreaView>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
