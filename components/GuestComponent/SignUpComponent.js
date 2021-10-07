import React from "react";
import { ActivityIndicator, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../Dimensions/defaults";
import { Icon } from "react-native-elements";
import firebase from 'firebase'
import {
  NotchHeight,
  ScreenHeight,
  ScreenWidth,
} from "../Dimensions/dimensions";
import LogTextComponent from "./LogTextComponent";
import TopComponent from "./TopComponent";
import { getUser, getCart, getWish, getProduct } from "../../redux/ActionCreators";
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

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      name: "",
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
          marginTop: 10,
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
            placeholder="Name"
            autoCompleteType="name"
            onChangeText={(e) => this.setState({ name: e })}
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
            width: ScreenWidth - 80,
            height: 50,
            // backgroundColor: "blue",
          }}
        >
          <TextInput
            editable={!this.state.isLoading}
            placeholder="Email"
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
              marginTop: 10
            }}
          />
        </View>
        <View
          style={{
            width: ScreenWidth ,
            height: 50,
            // backgroundColor: "blue",
            marginTop: 10,
            alignItems: "center"
          }}
        >
          <TextInput
            editable={!this.state.isLoading}
            placeholder="Password"
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
              width: ScreenWidth-80,
              marginTop: 10
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
              top: 10
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
          <TextInput
            editable={!this.state.isLoading}
            placeholder="Re-Enter Password"
            secureTextEntry={this.state.hidePass}
            autoCompleteType="password"
            onChangeText={(e) => this.setState({ repassword: e })}
            style={{
              backgroundColor: theme.textBg,
              height: 50,
              textAlign: "center",
              borderColor: theme.textOuter,
              borderWidth: 1,
              color: theme.darkTextColor,
              width: ScreenWidth-80,
              marginTop :10
            }}
          />
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
              width: ScreenWidth-80
            }}
          >
            {this.state.isLoading ? 
            <ActivityIndicator color={theme.lightTextColor} />
            :
            <Text
              style={{
                justifyContent: "center",
                textAlign: "center",
                color: theme.mainBg,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              REGISTER
            </Text>
          }

          </TouchableOpacity>



          <View
      style={{
        width: ScreenWidth,
        height: 1,
        backgroundColor: theme.textOuter,
        marginTop: 20
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
          Already have an account!
        </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")} activeOpacity={1}>
        <Text
          style={{
            // backgroundColor: "blue",
            fontSize: 14,
            color: theme.primaryDark,
            marginLeft: 2,
            fontWeight: 'bold'
          }}
        >
          Login
        </Text>
        </TouchableOpacity>

      </View>
        </View>
      </View>
    );
  };

  // _renderNavToReg = () => {
  //   return(
  //     <View
  //     style={{
  //       width: ScreenWidth,
  //       height: 1,
  //       backgroundColor: theme.textOuter,
  //     }}
  //   >
  //     <View
  //       style={{
  //         width: ScreenWidth,
  //         height: 40,
  //         // backgroundColor: "red",
  //         flexDirection: "row",
  //         marginTop: 10,
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           // backgroundColor: "green",
  //           fontSize: 14,
  //           color: theme.darkTextColor,
  //         }}
  //       >
  //         Don't have an account!
  //       </Text>
  //       <TouchableOpacity onPress={() => alert("Pressed")}>
  //       <Text
  //         style={{
  //           // backgroundColor: "blue",
  //           fontSize: 14,
  //           color: theme.primaryDark,
  //           marginLeft: 2,
  //           fontWeight: 'bold'
  //         }}
  //       >
  //         Register
  //       </Text>
  //       </TouchableOpacity>

  //     </View>
  //   </View>
  //   )
  // }
  showRegAlert = (title, message) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: "Login",
        style: "default",
        onPress: () => this.props.navigation.navigate("SignIn")
      }
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
      }
    ],
    {
      cancelable: true,
    }
  );

  loginLogic = () => {
        this.setState({isLoading: true});
        if(this.state.password != this.state.repassword) {
            this.showAlert("Password didn't match")
            this.setState({isLoading: false})
        }else {

        
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let userToUpload = {
        userid: user.uid,
        email: user.email,
        username: this.state.name
      }
      userCollection.doc().set(userToUpload).then(() => {
        this.props.getUser();
        this.setState({isLoading: false})
      }).catch((error) => {
        this.showAlert("Error", "Please try again later")
        this.setState({isLoading: false})
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      if(errorMessage == "The email address is already in use by another account.") {
        this.showRegAlert("Hola", "You are already one of ours!")
      }else if (error.message == "The email address is badly formatted.") {
        this.showAlert("Invalid Email ID", "")
      }
      
      this.setState({isLoading: false})
      // ..
    });
}
  }
  render() {
    return (
      <ScrollView>
        {/* <SafeAreaView> */}
        <View
          style={{
            width: ScreenWidth,
            height: Platform.OS === 'ios' ? ScreenHeight + ScreenHeight / 2 : ScreenHeight+NotchHeight,
            backgroundColor: theme.mainBg,
          }}
        >
          <TopComponent type="register" navigation={this.props.navigation} />
          <LogTextComponent type="Register" />
          <this._renderLoginComponent />
        </View>

        {/* </SafeAreaView> */}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
