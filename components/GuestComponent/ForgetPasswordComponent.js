import React from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Easing,
} from "react-native";
import { SafeAreaView, ScrollView, View, Animated } from "react-native";
import { Button, Overlay, Text } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../Dimensions/defaults";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../Dimensions/dimensions";
import LogTextComponent from "./LogTextComponent";
import TopComponent from "./TopComponent";
import {
  getUser,
  getCart,
  getWish,
  getProduct,
} from "../../redux/ActionCreators";
import { Alert } from "react-native";

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

class ForgetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hidePass: true,
      isLoading: false,
    };
  }

  _renderLoginComponent = () => {
    return (
      <View
        style={{
          width: ScreenWidth,
          height: ScreenHeight / 2,
          // backgroundColor: "red",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: ScreenWidth - 80,
            height: 50,
            // backgroundColor: "blue",
          }}
        >
          <TextInput
            editable={!this.state.isLoading}
            placeholder="johndoe@gmail.com"
            autoCompleteType="email"
            keyboardType="email-address"
            onChangeText={(e) => this.setState({ email: e })}
            style={{
              backgroundColor: theme.textBg,
              height: 50,
              textAlign: "center",
              borderColor: theme.textOuter,
              borderWidth: 1,
              color: theme.darkTextColor,
            }}
          />
        </View>
        <View
          style={{
            width: ScreenWidth,
            height: 50,
            // backgroundColor: "blue",
            marginTop: 10,
            alignItems: "center",
          }}
        >


          <TouchableOpacity
            onPress={() => this.loginLogic()}
            disabled={this.state.isLoading}
            activeOpacity={1}
            style={{
              backgroundColor: theme.primaryDark,
              borderRadius: 100,
              height: 52,
              justifyContent: "center",
              marginTop: 20,
              width: ScreenWidth - 80,
            }}
          >
            {this.state.isLoading ? (
              <ActivityIndicator color={theme.lightTextColor} />
            ) : (
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  color: theme.mainBg,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                GET RESET LINK
              </Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    );
  };


  showLogAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Okay",
          style: "default",
          onPress: () => this.props.navigation.navigate("SignIn"),
        },
      ],
      {
        cancelable: true,
      }
    );
    showRegAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Register",
          style: "default",
          onPress: () => this.props.navigation.navigate("SignUp"),
        },
      ],
      {
        cancelable: true,
      }
    );

  showAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Okay",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  loginLogic = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log("Done");
        this.showLogAlert("Done", "Please check your inbox for new password")
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error.message);
if (error.message == "The email address is badly formatted.") {
          this.showAlert("Invalid Email ID", "");
        }else if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          this.showRegAlert("We could not find you", "Onboard with us!")
        }
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <ScrollView>
        {/* <SafeAreaView> */}
        <View
          style={{
            width: ScreenWidth,
            height:
              Platform.OS === "ios"
                ? ScreenHeight + ScreenHeight / 2
                : ScreenHeight + NotchHeight,
            backgroundColor: theme.mainBg,
          }}
        >
          <TopComponent type="forget" navigation={this.props.navigation} />
          <LogTextComponent type="Reset Password" />
          <this._renderLoginComponent />
        </View>

        {/* </SafeAreaView> */}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordComponent);
