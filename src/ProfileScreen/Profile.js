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

export default class Profile extends React.Component {

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
        <Text>Profile</Text>
      </Container>
    );
  }
}
