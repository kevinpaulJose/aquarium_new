import React from "react";
import {View, Image, Text} from "react-native";
import {theme} from "../Dimensions/defaults";
import {
    NotchHeight,
    ScreenHeight,
    ScreenWidth,
} from "../Dimensions/dimensions";

export default function LogTextComponent({type}) {
    return (
        <View
            style={{
                width: ScreenWidth,
                height: 70,
                // backgroundColor: "red",
                marginTop: 60,
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width: 300,
                    height: 70,
                    // backgroundColor: "green",
                    alignItems: "center",
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 39,
                            color: theme.darkTextColor,
                        }}
                    >
                        {type}
                    </Text>
                </View>
                <View style={{marginTop: 2}}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.lightTextColor,
                        }}
                    >
                        Please enter the details below to continue
                    </Text>
                </View>
            </View>
        </View>
    );
}
