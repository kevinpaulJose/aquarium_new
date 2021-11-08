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
    getProduct, getAddress,
} from "../../redux/ActionCreators";
import {Alert} from "react-native";
import TopComponentHome from "./HomeSharedComponents/TopComponent";
import FishCatComponent from "./HomeSharedComponents/FishCatComponent";
import TankCatComponent from "./HomeSharedComponents/TankCatComponent";
import AccCatComponent from "./HomeSharedComponents/AccCatComponent";
import FoodCatComponent from "./HomeSharedComponents/FoodCatComponent";
import SocialComponent from "./HomeSharedComponents/SocialComponent";

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
    getAddress: (uid) => dispatch(getAddress(uid))
});


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.getCart(this.props.userSystemData.data[0].userid);
        this.props.getAddress(this.props.userSystemData.data[0].userid);
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

            <ScrollView>
                <FishCatComponent navigation={this.props.navigation}/>
                <this._renderLine/>
                <TankCatComponent navigation={this.props.navigation}/>
                <this._renderLine/>
                <FoodCatComponent navigation={this.props.navigation}/>
                <this._renderLine/>
                <AccCatComponent navigation={this.props.navigation}/>
                <this._renderLine/>
                <SocialComponent/>
            </ScrollView>


        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
