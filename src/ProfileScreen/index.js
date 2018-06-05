import React, { Component } from "react";
import Profile from "./Profile";

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
    Profile: { screen: props => <Profile {...props} /> }
  },

));
