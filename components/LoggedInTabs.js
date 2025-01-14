import React, { useContext } from 'react';
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
import { SettingsContext } from '../SettingsContext'; // Import SettingsContext
import { StatusBar, View, Platform } from 'react-native'; // Import StatusBar to handle top status bar

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const { theme, isDarkMode } = useContext(SettingsContext); // Use the context

  return (
    <>
      {/* Configure StatusBar */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#333333' : '#f5f5f5'}
        translucent={false} // Ensure no overlap with content
      />
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
          tabBarActiveTintColor: isDarkMode ? 'white' : 'navy',
          tabBarInactiveTintColor: isDarkMode ? 'gray' : 'gray',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
            borderTopWidth: 0, // Remove the top border
            paddingBottom: Platform.OS === 'android' ? 0 : 10,
            marginBottom: 0,
          },
          headerStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove bottom border
          },
          headerTintColor: isDarkMode ? '#fff' : '#333',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Novosti" component={Novosti} />
        <Tab.Screen name="FAQ" component={FAQ} />
        <Tab.Screen name="Karta" component={Karta} />
        <Tab.Screen name="Kontakt" component={Kontakt} />
      </Tab.Navigator>
    </>
  );
};

const LoggedInTabs = () => {
  const { theme } = useContext(SettingsContext);

  return (
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
};

export default LoggedInTabs;
