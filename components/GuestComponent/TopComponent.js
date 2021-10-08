import React from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {theme} from "../Dimensions/defaults";
import {
    NotchHeight,
    ScreenHeight,
    ScreenWidth,
} from "../Dimensions/dimensions";

export default function TopComponent({type, navigation}) {
    return (
        <View>
            {type === "login" ? (
                <View
                    style={{
                        height: 40,
                        //   backgroundColor: "red",
                        width: ScreenWidth,
                        marginTop: 50,
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            height: 40,
                            // backgroundColor: "green",
                            width: 100,
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                backgroundColor: theme.primaryDark,
                                width: 15,
                                borderRadius: 100,
                            }}
                        />
                        <View
                            style={{
                                height: 40,
                                backgroundColor: theme.primaryDark,
                                width: 15,
                                borderRadius: 100,
                                marginLeft: 5,
                                marginTop: 20,
                            }}
                        />
                    </View>
                </View>
            ) : (
                <>
                    <View style={{marginTop: 20}}/>
                </>
            )}

            <View
                style={{
                    height: ScreenHeight / 2 / 2,
                    // backgroundColor: "red",
                    width: ScreenWidth,
                    marginTop: 30,
                    alignItems: "center",
                }}
            >
                {type !== "login" ? (
                    <TouchableOpacity
                        style={{
                            // backgroundColor: "green",
                            height: 50,
                            width: 50,
                            position: "absolute",
                            left: 0,
                            justifyContent: "center",
                            zIndex: 100,
                        }}
                        activeOpacity={1}
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <View>
                            <Icon
                                name="arrow-back-outline"
                                type="ionicon"
                                color={theme.lightTextColor}
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <></>
                )}

                <View
                    style={{
                        height: ScreenHeight / 2 / 2,
                        // backgroundColor: "green",
                        width: ScreenWidth - 100,
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: -60,
                    }}
                >
                    <View
                        style={{
                            height: ScreenHeight / 2 / 2,
                            backgroundColor: theme.mainBg,
                            width: (ScreenWidth - 150) / 2,
                            borderRadius: 100,

                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 1.41,

                            elevation: 2,
                        }}
                    >
                        <Image
                            source={require("../../assets/coral1.jpg")}
                            style={{
                                width: (ScreenWidth - 150) / 2,
                                height: ScreenHeight / 2 / 2,
                                borderRadius: 100,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            height: ScreenHeight / 2 / 2,
                            backgroundColor: theme.mainBg,
                            width: (ScreenWidth - 150) / 2,
                            borderRadius: 100,
                            position: "absolute",
                            right: 10,
                            top: 50,

                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 1.41,

                            elevation: 2,
                        }}
                    >
                        <Image
                            source={require("../../assets/coral.jpg")}
                            style={{
                                width: (ScreenWidth - 150) / 2,
                                height: ScreenHeight / 2 / 2,
                                borderRadius: 100,
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
