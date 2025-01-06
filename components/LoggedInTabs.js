import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from 'react-native-vector-icons'; 
import FAQ from './FAQ';
import Home from './Home';
import Karta from './Karta';
import Kontakt from './Kontakt';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Drawer Screen" component={() => null} />
    </Drawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'FAQ') {
            iconName = 'book'; 
          } else if (route.name === 'Karta') {
            iconName = 'map';
          } else if (route.name === 'Home') {
            iconName = 'home';
          }
          else if (route.name === 'Kontakt') {
            iconName = 'phone';
          }
          

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Karta" component={Karta} />
      <Tab.Screen name="Kontakt" component={Kontakt} />

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