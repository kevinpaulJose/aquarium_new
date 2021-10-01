import React from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchData, saveData, deleteData, createUser, getUser, signoutUser} from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';



const mapStateToProps = state => {
    return {
        userSystemData: state.userSystemData,
        userData: state.userData
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData()),
    saveData: (data) => dispatch(saveData(data)),
    deleteData: () => dispatch(deleteData()),
    createUser: (email, password) => dispatch(createUser(email, password)),
    getUser: () => dispatch(getUser()),
    signoutUser: () => dispatch(signoutUser())
})

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    handle() {
        console.log("ExEcuted")
        // this.props.createUser(this.state.username, this.state.password);
        this.props.createUser("example4@gmail.com", "password");
        // this.props.getUser();
        
        // console.log()
    }
    showLog() {
        console.log(this.props.userData)
    }
    render() {
        return(
            <View style={{marginTop: 50}}>
                <View>
                    <Input
                        placeholder= "Username"
                        onChangeText={(username) => this.setState({username: username})}
                        value={this.state.username}
                    />
                    <Input
                        placeholder= "Password"
                        onChangeText={(password) => this.setState({password: password})}
                        value={this.state.password}
                    />
                </View>
                <View>
                    <Button 
                        onPress={() => this.handle()}
                        title='Register'
                        clear
                        size={24} />
                </View>
                <View>
                    <Button 
                        onPress={() => this.showLog()}
                        title='Delete'
                        clear
                        size={24} />
                </View>
            </View>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);