// Navigation.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import OnboardingScreen from './OnboardingScreen';
import PhoneAuth from './PhoneAuth';
import Registration from './Registration';

const AppNavigator = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
    PhoneRegistration:PhoneAuth,
    Registration: Registration,
  },
  {
    initialRouteName: 'Onboarding',
    headerMode: 'none', // Hide the navigation header
  }
);

export default createAppContainer(AppNavigator);
