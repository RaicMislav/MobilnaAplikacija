import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from 'react-native-vector-icons'; 
import LoggedInView from './LoggedInView';
import FAQ from './FAQ';
import Home from './Home';
import Karta from './Karta';

// Initialize Tab and Drawer navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Drawer navigator (minimal, blank screen for now)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {/* Blank Drawer screen */}
      <Drawer.Screen name="Drawer Screen" component={() => null} />
    </Drawer.Navigator>
  );
};

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Profil') {
            iconName = 'person'; 
          } else if (route.name === 'FAQ') {
            iconName = 'book'; 
          } else if (route.name === 'Karta') {
            iconName = 'map';
          } else if (route.name === 'Home') {
            iconName = 'home';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profil" component={LoggedInView} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Karta" component={Karta} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default function LoggedInTabs() {
  return (
    <Drawer.Navigator>
      {/* Add the TabNavigator as a screen in the Drawer */}
      <Drawer.Screen name="Fakultet Strojarstva, Računarstva i Elektrotehnike" component={TabNavigator} />
    </Drawer.Navigator>
  );
}