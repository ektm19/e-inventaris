import React, { Component } from 'react';

import { StyleSheet, View, Alert, KeyboardAvoidingView, ScrollView, TextInput, Image, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
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
import Peminjaman from '../ChatScreen/Peminjaman';
class ShowStudentListActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  static navigationOptions =
  {
     header: null,
  };
 
  componentDidMount() {
 
    return fetch('https://ajudanuts.000webhostapp.com/listVas.php')
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
  GetStudentIDFunction=(id_barang, nama_barang, pemilik_barang)=>{

    this.props.navigation.navigate('Third', { 
      ID: id_barang,
      NAMA: nama_barang,
      PEMILIK: pemilik_barang
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
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>HomeScreen</Title>
        
      </Body>
      <Right />
    </Header>
    
         <ListView
 
          dataSource={this.state.dataSource}

          renderSeparator= {this.ListViewItemSeparator}

          renderRow={(rowData) =>
            
          <View style={{flex:1, flexDirection: 'row'}}>
            <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text  style={{fontWeight:'bold', fontSize:20}}>{rowData.nama_barang}</Text>
                  <Text note>{rowData.pemilik_barang}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: rowData.link}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{alignItems:'center'}}>
            <TouchableOpacity 
            style={styles.TouchableOpacityStyle2} 
            onPress={this.GetStudentIDFunction.bind(
                          this,
                          rowData.id_barang,
                          rowData.nama_barang,
                          rowData.pemilik_barang
                           )} >
   
            <Text style={styles.TextStyle}> Pinjam </Text>
   
         </TouchableOpacity>
         </CardItem>
           </Card>
           
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
        TextInput_Nim: '',
        TextInput_Id_Brg: '',
        TextInput_Pinjam: '',
        TextInput_Kembali: '',
        TextInput_Nama_Brg: '',
        TextInput_Pemilik: '',
        DateText: '',
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
    onDatePickedFunction = (date) => {
      this.setState({
        dobDate: date,
        TextInput_Kembali: moment(date).format('DD-MMM-YYYY'),
        //TextInput_Pinjam: moment(date).format('DD-MMM-YYYY')
      });
    }
    onDatePickedFunction2 = (date) => {
      this.setState({
        dobDate: date,
       // TextInput_Kembali: moment(date).format('DD-MMM-YYYY'),
        TextInput_Pinjam: moment(date).format('DD-MMM-YYYY')
      });
    }
    DatePickerMainFunctionCall2 = () => {

      let DateHolder = this.state.DateHolder;
  
      if(!DateHolder || DateHolder == null){
  
        DateHolder = new Date();
        this.setState({
          DateHolder: DateHolder
        });
      }
  
      //To open the dialog
      this.refs.DatePickerDialog2.open({
  
        date: DateHolder,
  
      });
  
    }
    
    onDatePickedFunction2 = (date) => {
      this.setState({
        dobDate: date,
       // TextInput_Kembali: moment(date).format('DD-MMM-YYYY'),
        TextInput_Pinjam: moment(date).format('DD-MMM-YYYY')
      });
    }
     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_Id_Brg : this.props.navigation.state.params.ID,
        TextInput_Nama_Brg : this.props.navigation.state.params.NAMA,
        TextInput_Pemilik: this.props.navigation.state.params.PEMILIK,
        
      })

     }
  
     static navigationOptions =
  {
     header: null,
  };

    InsertStudentRecordsToServer = () =>{

      fetch('https://ajudanuts.000webhostapp.com/insertData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        id_barang : this.state.TextInput_Id_Brg,
        
        nim : this.state.TextInput_Nim,

        tgl_pinjam : this.state.TextInput_Pinjam,

        tgl_kembali: this.state.TextInput_Kembali

      })

      }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
       if(responseJson === 'Succes')
        {

            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Peminjaman');

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
          
     <View style={styles.MainContainerList}>
      <Header>
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>HomeScreen</Title>
        
      </Body>
      <Right />
    </Header>
   <ScrollView>
    <View style={styles.MainContainer}>
            <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 35}}> Peminjaman Registration Form </Text>
            <Text>Nama Barang</Text>
            <TextInput
              
              //placeholder="Enter Student Name"
              value={this.state.TextInput_Nama_Brg}
     
              onChangeText={ TextInputValue => this.setState({ TextInput_Nama_Brg: TextInputValue }) }
     
              underlineColorAndroid='transparent'
     
              style={styles.TextInputStyleClass}
            />
            <Text>Pemilik Barang</Text>
            <TextInput
              
             // placeholder="Enter Student Name"
              value={this.state.TextInput_Pemilik}
     
              onChangeText={ TextInputValue => this.setState({ TextInput_Pemilik: TextInputValue }) }
     
              underlineColorAndroid='transparent'
     
              style={styles.TextInputStyleClass}
            />
            <Text>Kode Barang</Text>
            <TextInput
              
             // placeholder="Enter Student Name"
              value={this.state.TextInput_Id_Brg}
     
              onChangeText={ TextInputValue => this.setState({ TextInput_Id_Brg: TextInputValue }) }
     
              underlineColorAndroid='transparent'
     
              style={styles.TextInputStyleClass}
            />
           <Text>NIM Peminjam</Text>
           <TextInput
              
              placeholder="Masukan NIM"
     
              onChangeText={ TextInputValue => this.setState({ TextInput_Nim: TextInputValue }) }
     
              underlineColorAndroid='transparent'
     
              style={styles.TextInputStyleClass}
            />
           <Text>Tanggal Peminjaman</Text>
           <TouchableOpacity onPress={this.DatePickerMainFunctionCall2.bind(this)} >

            <View style={styles.datePickerBox}>

              <Text
              style={styles.datePickerText}>{this.state.TextInput_Pinjam}</Text>

            </View>

          </TouchableOpacity>

            <Text>Tanggal Pengembalian</Text>
            <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

            <View style={styles.datePickerBox}>

              <Text
              style={styles.datePickerText}>{this.state.TextInput_Kembali}</Text>

            </View>

          </TouchableOpacity>

           <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >
     
             <Text style={styles.TextStyle}> INSERT Peminjaman </Text>
     
           </TouchableOpacity>
           <DatePickerDialog ref="DatePickerDialog2" onDatePicked={this.onDatePickedFunction2.bind(this)} />
           <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
     </View>
     </ScrollView>
     </View> 
      
        );
      }

}

class LayoutPeminjaman extends React.Component {
  static navigationOptions = {
   header: null,
   };
 
 render() {
   return (
     <Peminjaman />
   );
 }
}

export default MyNewProject = StackNavigator(

  {


    Second: { screen: ShowStudentListActivity },

    Third: { screen: EditStudentRecordActivity },
    Peminjaman: { screen: LayoutPeminjaman }

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
    width: '50%',
    height: 150 ,
    margin: 10,
    borderRadius : 10
    
    },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
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
    alignItems: 'center',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  TouchableOpacityStyle2: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '100%',
    backgroundColor: '#00BCD4'


  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',
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
  

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});