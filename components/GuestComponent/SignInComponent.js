import React from "react";
import { Image } from "react-native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../Dimensions/defaults";
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../Dimensions/dimensions";
import LogTextComponent from "./LogTextComponent";
import TopComponent from "./TopComponent";

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

class SignInComponent extends React.Component {
  render() {
    return (
      // <View style={{marginTop: 200}}>
      //     <Text>Sign In</Text>
      //     <Button onPress={() => {
      //         this.props.navigation.navigate('SignUp')
      //     }}>Next</Button>
      // </View>
      <ScrollView>
        {/* <SafeAreaView> */}
        <View
          style={{
            width: ScreenWidth,
            height: ScreenHeight + ScreenHeight / 2,
            backgroundColor: theme.mainBg,
          }}
        >
          <TopComponent type="login" />
          <LogTextComponent type="login" />
        </View>

        {/* </SafeAreaView> */}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
