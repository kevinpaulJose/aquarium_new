import React from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { getUser, getCart, getWish, getProduct } from "../redux/ActionCreators";
import { addCartData, removeCartData } from "../firebase/functions";
import SignInComponent from "./GuestComponent/SignInComponent";
import SignUpComponent from "./GuestComponent/SignUpComponent";
import Main from "./MainComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ForgetPasswordComponent from "./GuestComponent/ForgetPasswordComponent";

const Stack = createStackNavigator();

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

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handle() {
    // console.log("ExEcuted")
    // this.props.createUser(this.state.username, this.state.password);
    // this.props.createUser("example11@gmail.com", "password", "kevin Paul");
    // this.props.getUser();
    // this.props.signoutUser();
    // this.props.signinUser("example11@gmail.com", "password")
    // console.log()
    // this.props.getCart("123");
    // this.props.getWish("123");
    // removeCartData("123").then(() => {
    //         console.log("ExEcuted")
    //     });
    this.props.getProduct();
  }
  showLog() {
    console.log(this.props.prodData);
  }

  componentDidMount() {
    console.log(this.props.userSystemData.data)
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.userSystemData.data.length == 0 ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInComponent} />
            <Stack.Screen name="SignUp" component={SignUpComponent} />
            <Stack.Screen name="Reset" component={ForgetPasswordComponent} />
          </Stack.Group>

          ) : (
            <Stack.Group>
              <Stack.Screen name="Home" component={Main} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
