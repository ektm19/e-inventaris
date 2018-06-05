import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Image, Text, Platform,RefreshControl, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'

import moment from 'moment';
import { StackNavigator } from 'react-navigation';
import {
  Button,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Thumbnail,
  Icon,
  Right
} from "native-base";
import HomeScreen from "../HomeScreen";

class Peminjaman extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true
    }
  }

  static navigationOptions =
  {
     header: null,
  };
 
  componentDidMount() {
 
    return fetch('https://ajudanuts.000webhostapp.com/listPeminjaman.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  GetStudentIDFunction=(id_peminjaman,  tgl_kembali)=>{

    this.props.navigation.navigate('Second', { 
      ID_BRG: id_peminjaman,
      PERPANJANG: tgl_kembali
    });

}
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .8,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
      <View style={styles.MainContainerList}>
      <Header>
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Peminjaman </Title>
        
      </Body>
      <Right />
    </Header>
         <ListView
         refreshControl={
          <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this.componentDidMount.bind(this)}
          />
         }
          dataSource={this.state.dataSource}

          renderSeparator= {this.ListViewItemSeparator}

          renderRow={(rowData) =>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Image source = {{ uri: rowData.link }} style={styles.imageViewContainer} />
            <View style={{ marginTop: 10 }}>
            <Text>Nama Barang: {rowData.nama_barang}</Text>
            <Text>Nama Peminjam: {rowData.nama}</Text>
            <Text>Tgl Pinjam: {rowData.tgl_pinjam}</Text>
            <Text>Tgl Kembali: {rowData.tgl_kembali}</Text>
            <TouchableOpacity 
            style={styles.TouchableOpacityStyle2} 
            onPress={this.GetStudentIDFunction.bind(
                          this,
                          rowData.id_peminjaman,
                          rowData.tgl_kembali
                           )} >
   
            <Text style={styles.TextStyle}> Perpanjang </Text>
   
         </TouchableOpacity>
            
            </View>
            
          </View>
          
          }
          />
        </View>
    );
  }

}
class EditStudentRecordActivity extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         TextInput_ID: '',
         TextInput_Perpanjang: '',
         DateHolder: null,
    
       }
    
     }
     DatePickerMainFunctionCall = () => {

      let DateHolder = this.state.DateHolder;
  
      if(!DateHolder || DateHolder == null){
  
        DateHolder = new Date();
        this.setState({
          DateHolder: DateHolder
        });
      }
  
      //To open the dialog
      this.refs.DatePickerDialog.open({
  
        date: DateHolder,
  
      });
  
    }
  
    /**
     * Call back for dob date picked event
     *
     */
    onDatePickedFunction = (date) => {
      this.setState({
        dobDate: date,
        TextInput_Perpanjang: moment(date).format('DD-MMM-YYYY')
      });
    }
  
     componentDidMount(){
 
      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_ID : this.props.navigation.state.params.ID_BRG,
        TextInput_Perpanjang: this.props.navigation.state.params.PERPANJANG,
      })
 
     }
  
    static navigationOptions =
    {
       header: null,
    };
 
    UpdateStudentRecord = () =>{
      
            fetch('https://ajudanuts.000webhostapp.com/perpanjang.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              id_peminjaman : this.state.TextInput_ID,
      
              tgl_kembali: this.state.TextInput_Perpanjang
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
                this.props.navigation.navigate('First');
 
      }
 
 
    DeleteStudentRecord = () =>{
        
          fetch('https://ajudanuts.000webhostapp.com/delete.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            id_peminjaman : this.state.TextInput_ID
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });
 
          this.props.navigation.navigate('First');
 
      }
 
    render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 50}}> Perpanjang Peminjaman </Text>
          <Text> Kode Peminjaman </Text>
          <TextInput
            
            placeholder="Student Name Shows Here"
            
            value={this.state.TextInput_ID}
   
           // onChangeText={ TextInputValue => this.setState({ TextInput_Student_Name : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
         <Text> Tanggal Pengembalian </Text>
         <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

            <View style={styles.datePickerBox}>

              <Text
              style={styles.datePickerText}>{this.state.TextInput_Perpanjang}</Text>

            </View>

          </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
            <Text style={styles.TextStyle}> UPDATE Perpanjangan </Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyleRed} onPress={this.DeleteStudentRecord} >
   
            <Text style={styles.TextStyle}> Batalkan dan Hapus Peminjaman </Text>
   
         </TouchableOpacity>
         <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
   
   </View>
              
      );
    }
 
}
 
export default MyNewProject = StackNavigator(
 
  {
 
    First: { screen: Peminjaman },
 
    Second: { screen: EditStudentRecordActivity }
 
  });
const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },
  MainContainerList :{
 
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    margin: 0,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    
    },

  imageViewContainer: {
    width: '30%',
    height: 100 ,
    margin: 10,
    borderRadius : 10
    
    },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },
    datePickerBox:{
      marginTop: 9,
      padding: 0,
      width: 325,
      marginBottom: 7,
      height: 40,
      borderWidth: 1,
      borderColor: '#FF5722',
      borderRadius: 5 ,
      justifyContent:'center'
    },
  
    datePickerText: {
      textAlign: 'center',
      fontSize: 14,
      marginLeft: 5,
      borderWidth: 0,
      color: '#000',
  
    },
    

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },
  TouchableOpacityStyleRed: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: 'red'

  },
  TouchableOpacityStyle2: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    marginTop:5,
    width: 90,
    height: 40 ,
    backgroundColor: '#00BCD4'


  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});