import React from "react";
import { Image } from 'react-native';
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  List,
  ListItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Thumbnail,
  Icon,
  Right
} from "native-base";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
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
            <Title>HomeScreen</Title>
            
          </Body>
          <Right />
        </Header>
        <Content padder>
        <List>
            <ListItem itemHeader first>
              <Text>Kategori</Text>
            </ListItem>
            <ListItem >
             <Left>
                <Text>Taplak Meja</Text>
              </Left>
              <Right>
              <Button
                full
                rounded
                primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("ProfileScreen")}
              >
                <Icon name="arrow-forward" />
          </Button>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Vas Bunga</Text>
              </Left>
              <Right>
          <Button
                full
                rounded
                primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("ProfileScreen2")}
              >
                <Icon name="arrow-forward" />
          </Button>
              </Right>
            </ListItem>
          </List>
          
        </Content>
      </Container>
    );
  }
}
