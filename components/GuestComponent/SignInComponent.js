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

class SignInComponent extends React.Component {
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
          <TextInput
            editable={!this.state.isLoading}
            placeholder="**********"
            secureTextEntry={this.state.hidePass}
            autoCompleteType="password"
            onChangeText={(e) => this.setState({ password: e })}
            style={{
              backgroundColor: theme.textBg,
              height: 50,
              textAlign: "center",
              borderColor: theme.textOuter,
              borderWidth: 1,
              color: theme.darkTextColor,
              width: ScreenWidth - 80,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              // backgroundColor: "red",
              right: 40,
              justifyContent: "center",
            }}
          >
            {this.state.hidePass ? (
              <Icon
                name="eye-off"
                type="ionicon"
                color={theme.lightTextColor}
                size={20}
                onPress={() =>
                  this.setState({ hidePass: !this.state.hidePass })
                }
              />
            ) : (
              <Icon
                name="eye"
                type="ionicon"
                color={theme.lightTextColor}
                size={20}
                onPress={() =>
                  this.setState({ hidePass: !this.state.hidePass })
                }
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Reset")}
            activeOpacity={1}
            style={{
              width: ScreenWidth - 80,
              height: 30,
              // backgroundColor: "red",
            }}
          >
            <Text
              style={{
                // backgroundColor: "green",
                textAlign: "right",
                marginTop: 5,
                fontSize: 14,
                color: theme.primaryDark,
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
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
                LOGIN
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              width: ScreenWidth,
              height: 1,
              backgroundColor: theme.textOuter,
              marginTop: 20,
            }}
          />
          <View
            style={{
              width: ScreenWidth,
              height: 40,
              // backgroundColor: "orange",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                // backgroundColor: "green",
                fontSize: 14,
                color: theme.darkTextColor,
              }}
            >
              Don't have an account!
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
              activeOpacity={1}
            >
              <Text
                style={{
                  // backgroundColor: "blue",
                  fontSize: 14,
                  color: theme.primaryDark,
                  marginLeft: 2,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  showRegAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
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
    showForgetAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Forgot Password",
          style: "default",
          onPress: () => this.props.navigation.navigate("Reset"),
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user);
        this.props.getUser();
        this.props.getProduct();
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message ==
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.showRegAlert("New User?", "Don't hesitate to Register with us!");
        } else if (
          error.message ==
          "The password is invalid or the user does not have a password."
        ) {
          this.showForgetAlert("Incorrect Password", "");
        } else if (error.message == "The email address is badly formatted.") {
          this.showAlert("Invalid Email ID", "");
        } else {
          this.showAlert("Error", "Please try again");
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
            height:ScreenHeight + ScreenHeight / 2,
            backgroundColor: theme.mainBg,
          }}
        >
          <TopComponent type="login" />
          <LogTextComponent type="Login Now" />
          <this._renderLoginComponent />
        </View>

        {/* </SafeAreaView> */}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
