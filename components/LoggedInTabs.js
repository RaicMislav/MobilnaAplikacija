import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; 
import FAQ from './FAQ';
import Home from './Home';
import Karta from './Karta';
import { AuthContext } from '../AuthContext';
import Kontakt from './Kontakt';
import Novosti from './Novosti';
import Profile from './Profile';
import Postavke from './Postavke';

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
          else if (route.name === 'Kontakt') {
            iconName = 'phone';
          }
          else if (route.name === 'Novosti') {
            iconName = 'email';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Novosti" component={Novosti} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Karta" component={Karta} />
      <Tab.Screen name="Kontakt" component={Kontakt} />
    </Tab.Navigator>
  );
};

export default function LoggedInTabs() {
  const { logout } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          {/* Stilizirani DrawerItem */}
          <Text
            style={styles.logoutText}
            onPress={logout}
          >
            Logout
          </Text>
        </DrawerContentScrollView>
      )}
    >
      {/* Add the TabNavigator as a screen in the Drawer */}
      <Drawer.Screen name="Fakultet Strojarstva, Računarstva i Elektrotehnike" component={TabNavigator} />
      <Drawer.Screen name="Profil" component={Profile} />
      <Drawer.Screen name="Postavke" component={Postavke} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutText: {
    color: '#D32F2F', // Intenzivna crvena boja (danger)
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 16,
    textAlign: 'center',
  },
});
