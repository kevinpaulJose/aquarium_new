import React from "react";
import { View, Image } from "react-native";
import { theme } from "../Dimensions/defaults";
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../Dimensions/dimensions";

export default function TopComponent({ type }) {
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
            ></View>
            <View
              style={{
                height: 40,
                backgroundColor: theme.primaryDark,
                width: 15,
                borderRadius: 100,
                marginLeft: 5,
                marginTop: 20,
              }}
            ></View>
          </View>
        </View>
      ) : (
        <>
          <View style={{ marginTop: 20 }}></View>
        </>
      )}

      <View
        style={{
          height: ScreenHeight / 2 / 2,
          //   backgroundColor: "red",
          width: ScreenWidth,
          marginTop: 30,
          alignItems: "center",
        }}
      >
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
            ></Image>
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
            ></Image>
          </View>
        </View>
      </View>
    </View>
  );
}
