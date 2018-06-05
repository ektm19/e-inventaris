import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, ScrollView, Text, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Login from './login';
import { Container, Header, Content, Item, Input } from 'native-base';
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
 
      super(props)
   
      this.state = {
   
        UserNIM: '',
        UserNama: '',
        UserJurusan: '',
        UserPassword: ''
   
      }
   
    }
   
  UserLoginFunction = () =>{
   
   const { UserNIM }  = this.state ;
   const { UserNama }  = this.state ;
   const { UserJurusan }  = this.state ;
   const { UserPassword }  = this.state ;
   
   
  fetch('https://ajudanuts.000webhostapp.com/signup.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      nim: UserNIM,
      nama: UserNama,
      jurusan: UserJurusan,
      password: UserPassword
      
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
  
          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
  
              //Then open Profile activity and send user email to profile activity.
              this.props.navigation.navigate('Second');
  
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
 
 <Text style= {styles.TextComponentStyle}>User Signup Form</Text>

 <TextInput
   placeholder="Enter User NIM"
   onChangeText={UserNIM => this.setState({ UserNIM })}
   underlineColorAndroid='transparent'
   style={styles.TextInputStyleClass}
 />
  <TextInput
   placeholder="Enter User Nama"

   onChangeText={UserNama => this.setState({ UserNama })}
   underlineColorAndroid='transparent'

   style={styles.TextInputStyleClass}
 />
  <TextInput
   placeholder="Enter User Jurusan"
   onChangeText={UserJurusan => this.setState({ UserJurusan })}
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

 <Button title="Click Here To Signup" onPress={this.UserLoginFunction} color="#2196F3" />
 <View style={{ marginTop: 10 }}>
 <Button title="Click Here To Login" onPress={() => this.props.navigation.navigate('Details')} color="#2196F3" />
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
      <Login />
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
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  TextInputStyleClass: {
   
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  color: "black",
  borderWidth: 1,
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
    marginTop: 100
   }
  });