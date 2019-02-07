import React, {Component} from 'react';
import {apiURL} from '../core/api';
import {
    AsyncStorage,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import {NetInfo} from 'react-native';

const styles = StyleSheet.create({
    container: {

        padding: 20,
        flex:1,
        backgroundColor:'#2c3e50'
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
        textAlign:'center'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    errorMessage:{
        color:'white',
        fontWeight: '800',
        fontSize: 17,
        textAlign: 'center',
        padding:20
    },
    title:{
        color:'white',
        fontWeight: '800',
        fontSize: 30,
        textAlign: 'center',
        padding:40,
    }
});

export class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Books</Text>
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           placeholder='Username'
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           onChangeText={(text) => this.setState({username: text})}
                />

                <TextInput style = {styles.input}
                           returnKeyType="go"
                           ref={(input)=> this.passwordInput = input}
                           placeholder='Password'
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           secureTextEntry
                           onChangeText={(text) => this.setState({password: text})}
                />

                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={() => this.onLogin(navigate)}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                </View>
            </View>
        );
    }

    storeDataInAsyncStorage = async (key, value) => {
        await AsyncStorage.setItem(key, value);
    };


    onLogin = (navigate) => {
        this.onlineLogin(navigate);
    };

    onlineLogin = (navigate) => {
        this.setState({isLoading: true});
        fetch(`${apiURL}/users/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
         .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
         })
         .then((responseJson) => {
             this.setState({errorMessage:'Login succesfully!'});
             this.storeDataInAsyncStorage('token',responseJson.token);
             navigate("BookScreen")
         })
         .catch((error) => {
             this.setState({errorMessage:'Login failed!'});
             this.setState({isLoading: false});
         })


        .then(response => {
            const headers = response.headers;
            this.storeDataInAsyncStorage('token', headers.get("Authorization")).then().catch((error) => {
                console.log(error)
            });
            return Promise.all([response.status])
        })
    };

}
