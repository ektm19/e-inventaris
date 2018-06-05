import React, { Component } from "react";
import Peminjaman from "./Peminjaman";
import JadeChat from "./JadeChat.js";
import NineChat from "./NineChat.js";
import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from "native-base";
export default (MainScreenNavigator = TabNavigator(
  {
    Peminjaman: { screen: props => <Peminjaman {...props} /> }
  },

));
