import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from 'react-native-vector-icons'; 
import FAQ from './FAQ';
import Home from './Home';
import Karta from './Karta';
import { AuthContext } from '../AuthContext';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Removed Profil Tab */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Karta" component={Karta} />
    </Tab.Navigator>
  );
};

export default function LoggedInTabs() {
  const { logout } = useContext(AuthContext)
  return (
    <Drawer.Navigator  drawerContent={props => {
      
        return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  )
}}>
      {/* Add the TabNavigator as a screen in the Drawer */}
      <Drawer.Screen name="Fakultet Strojarstva, Računarstva i Elektrotehnike" component={TabNavigator} />
      
    </Drawer.Navigator>

  );
}