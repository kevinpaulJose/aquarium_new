import React from "react";
import {
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    Platform,
    Easing,
} from "react-native";
import {SafeAreaView, ScrollView, View, Animated} from "react-native";
import {Badge, Button, Overlay, Text, Image} from "react-native-elements";
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

class TankCatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }


    render() {
        return (
            <View
                style={{width: ScreenWidth, alignItems: "center", marginTop: 30}}>
                <View style={{width: ScreenWidth - 40}}>
                    <View style={{width: ScreenWidth - 40, height: 30}}>
                        <View>
                            <Text style={{fontSize: 18, color: theme.darkTextColor}}>Shop Tanks</Text>
                        </View>
                        <TouchableOpacity
                            style={{position: "absolute", right: 0, bottom: 5}}>
                            <Text style={{fontSize: 14, color: theme.darkTextColor}}>See all >></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: ScreenWidth - 40,
                        // backgroundColor: "blue",
                        height: 190,
                        marginTop: 1,
                        borderRadius: 20
                    }}>
                        <Image source={require('../../../assets/tank.gif')}
                               style={{
                                   width: ScreenWidth - 40,
                                   height: 190,
                                   resizeMode: "cover",
                                   borderRadius: 20,
                                   overlayColor: theme.mainBg
                               }}/>

                    </View>
                    {
                        this.props.prodData.isLoading ? <View><ActivityIndicator/></View> :

                            <View style={{marginTop: 20, flexDirection: "row", flexWrap: "wrap"}}>
                                {this.props.prodData.data
                                    .filter(product => (product.category === "tanks") && (parseInt(product.stock) > 0))
                                    .slice(0, 2)
                                    .map((product, key) => (
                                    // <Text key={product.productId}>{product.name}</Text>
                                    <View style={{
                                        width: (ScreenWidth - 50) / 2,
                                        height: 230,
                                        borderRadius: 20,
                                        // backgroundColor: "blue",
                                        backgroundColor: theme.tankBg,
                                        marginRight: key % 2 === 0 ? 10 : 0,
                                        marginTop: key >= 2 ? 10 : 0,
                                        borderWidth: 1,
                                        borderColor: theme.textOuter
                                    }}>
                                        <View>
                                            <View style={{
                                                width: (ScreenWidth - 80) / 2,
                                                height: 50,
                                                // backgroundColor: "green",
                                                borderRadius: 20,
                                                flexDirection: "row"
                                            }}>
                                                <View style={{
                                                    height: 50,
                                                    // backgroundColor: "orange",
                                                    justifyContent: "center",
                                                    // marginLeft: 10
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: theme.darkTextColor,
                                                            textAlign: "center",
                                                            // backgroundColor: "pink",
                                                            width: (ScreenWidth - 80) / 2,
                                                        }}>{product.name}</Text>
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
                                        <View style={{alignItems: "center"}}>
                                            <View style={{
                                                width: ((ScreenWidth - 80) / 2) - 20,
                                                height: 100,

                                            }}>
                                                <Image source={{uri: product.image}} style={{
                                                    width: ((ScreenWidth - 80) / 2) - 20,
                                                    height: 100,
                                                    resizeMode: "cover",
                                                    borderRadius: 10
                                                }}
                                                       PlaceholderContent={<View style={{
                                                           width: ((ScreenWidth - 80) / 2) - 20,
                                                           height: 100,
                                                           backgroundColor: theme.tankBg
                                                       }}/>}
                                                />
                                            </View>
                                            <View style={{
                                                // width: ((ScreenWidth - 80) / 2) - 50,
                                                height: 20,
                                                marginTop: 10,
                                                // backgroundColor: "violet",
                                                flexDirection: "row",
                                                alignItems: "center"

                                            }}>
                                                {
                                                    parseInt(product.discountPercent) > 0 ?
                                                        <Text style={{
                                                            fontSize: 16,
                                                            textAlign: "center",
                                                            color: theme.badgeColor,
                                                            // backgroundColor: "red",
                                                            // flex: 1,
                                                            textDecorationStyle: "solid",
                                                            textDecorationLine: "line-through",
                                                            marginRight: 5
                                                        }}>
                                                            {product.price}₹
                                                        </Text> :
                                                        <></>
                                                }

                                                <Text ellipsizeMode='tail' style={{
                                                    fontSize: 16,
                                                    textAlign: "center",
                                                    color: theme.darkTextColor,
                                                    // flex: 1,

                                                }}>
                                                    {product.netPrice}₹
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={{
                                                backgroundColor: theme.tankColor,
                                                width: ((ScreenWidth - 80) / 2) - 20, height: 36, borderRadius: 10,
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
                                                <Text style={{textAlign: "center", color: theme.mainBg}}>
                                                    Add to Cart
                                                </Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                ))}
                            </View>
                    }


                </View>
            </View>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TankCatComponent);
