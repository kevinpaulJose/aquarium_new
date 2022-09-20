import React from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { getUser, getCart, getWish, getProduct } from "../redux/ActionCreators";
import { addCartData, removeCartData } from "../firebase/functions";
import firebase from "firebase";

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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
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
    // console.log(this.props.prodData)
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.getUser();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <View>
          <Input
            placeholder="Username"
            onChangeText={(username) => this.setState({ username: username })}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
          />
        </View>
        <View>
          <Button
            onPress={() => this.handle()}
            title="Register"
            clear
            size={24}
          />
        </View>
        <View>
          <Button
            style={{ marginTop: 10 }}
            onPress={() => this.showLog()}
            title="Delete"
            clear
            size={24}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
