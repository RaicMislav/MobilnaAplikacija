import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FAQ from './FAQ';
import Home from './Home';
import Karta from './Karta';
import Kontakt from './Kontakt';
import Novosti from './Novosti';
import Profile from './Profile';
import Postavke from './Postavke';
import ProfileButton from './ProfileButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator for visible tabs
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      headerRight: () => <ProfileButton />, // Profile button on the header
      headerRightContainerStyle: {
        paddingRight: 16,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'FAQ') {
          iconName = 'book';
        } else if (route.name === 'Karta') {
          iconName = 'map';
        } else if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Kontakt') {
          iconName = 'phone';
        } else if (route.name === 'Novosti') {
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

// Main Navigator with hidden screens
const LoggedInTabs = () => (
  <Stack.Navigator>
    {/* Tab Navigator as the main view */}
    <Stack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: false }} // Hide header for Tab.Navigator
    />
    {/* Hidden screens */}
    <Stack.Screen name="Profil" component={Profile} />
    <Stack.Screen name="Postavke" component={Postavke} />
  </Stack.Navigator>
);

export default LoggedInTabs;
