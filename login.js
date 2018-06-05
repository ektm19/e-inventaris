import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button,ScrollView, Text, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Signup from './signup';
import Masuk from './src/HomeScreen/index.js';
import { Container, Header, Content, Item, Input } from 'native-base';
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
  
 
      super(props)
   
      this.state = {
   
        UserNIM: '',
        UserPassword: ''
   
      }
   
    }
   
  UserLoginFunction = () =>{
   
   const { UserNIM }  = this.state ;
   const { UserPassword }  = this.state ;
   
   
  fetch('https://ajudanuts.000webhostapp.com/login.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      nim: UserNIM,
   
      password: UserPassword
      
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
  
          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
  
              //Then open Profile activity and send user email to profile activity.
              this.props.navigation.navigate('Masuk', { nim: UserNIM });
  
          }
          else{
  
            Alert.alert(responseJson);
          }
  
        }).catch((error) => {
          console.error(error);
        });
   
   
    }
  render() {
    return (
      <ImageBackground
      source={require('./src/back.png')}
      style={{width: '100%', height: '100%'}}
    > 
    <ScrollView>  
    <View>  
        <View style={styles.MainContainer}>
 
 <Text style= {styles.TextComponentStyle}>User Login Form</Text>

 <TextInput 
   
   // Adding hint in Text Input using Place holder.
   placeholder="Enter User NIM"

   onChangeText={UserNIM => this.setState({ UserNIM })}

   // Making the Under line Transparent.
   underlineColorAndroid='transparent'

   style={styles.TextInputStyleClass}
 />

 <TextInput
   
   // Adding hint in Text Input using Place holder.
   placeholder="Enter User Password"

   onChangeText={UserPassword => this.setState({UserPassword})}

   // Making the Under line Transparent.
   underlineColorAndroid='transparent'

   style={styles.TextInputStyleClass}

   secureTextEntry={true}
 />

 <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
 <View style={{ marginTop: 10 }}>
 <Button title="Click Here To Signup" onPress={() => this.props.navigation.navigate('Details')} color="#2196F3" />
 </View>

</View>
</View>
</ScrollView>
          </ImageBackground>
    );
  }
}

class SignupScreen extends React.Component {
   static navigationOptions = {
    header: null,
    };
  
  render() {
    return (
      <Signup />
    );
  }
}
class LoginScreen extends React.Component {
  static navigationOptions = {
   header: null,
   };
 
 render() {
   return (
     <Masuk />
   );
 }
}
const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: SignupScreen,
    },
    Masuk: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
 
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10,
  },
   
  TextInputStyleClass: {
   
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  color: "black",
  // Set border Hex Color Code Here.
   borderColor: '#2196F3',
   
   // Set border Radius.
   borderRadius: 5 ,
  
  },
  
   TextComponentStyle: {
     fontSize: 20,
    color: "black",
    textAlign: 'center', 
    marginBottom: 15,
    marginTop: 175
   }
  });