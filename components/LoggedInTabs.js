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
  const { theme, isDarkMode, translate } = useContext(SettingsContext); // Use theme and translate from context

  return (
    <>
      {/* Configure StatusBar */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.tab}
        translucent={false}
      />
      <Tab.Navigator
        initialRouteName="Početna"
        screenOptions={({ route }) => ({
          headerRight: () => <ProfileButton />, // Profile button on the header
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'FAQ') {
              iconName = 'book';
            } else if (route.name === translate('Karta')) {
              iconName = 'map';
            } else if (route.name === translate('Početna')) {
              iconName = 'home';
            } else if (route.name === translate('Kontakt')) {
              iconName = 'phone';
            } else if (route.name === translate('Novosti')) {
              iconName = 'email';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkMode ? 'white' : 'navy',
          tabBarInactiveTintColor: isDarkMode ? 'gray' : 'gray',
          tabBarStyle: {
            backgroundColor: theme.tab,
            borderTopWidth: 0, // Remove the top border
            paddingBottom: Platform.OS === 'android' ? 0 : 10,
            marginBottom: 0,
          },
          headerStyle: {
            backgroundColor: theme.tab, // Use theme.tab background
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove bottom border
          },
          headerTintColor: theme.text,
        })}
      >
        <Tab.Screen name={translate('Početna')} component={Home} />
        <Tab.Screen name={translate('Novosti')} component={Novosti} />
        <Tab.Screen name="FAQ" component={FAQ} />
        <Tab.Screen name={translate('Karta')} component={Karta} />
        <Tab.Screen name={translate('Kontakt')} component={Kontakt} />
      </Tab.Navigator>
    </>
  );
};

const LoggedInTabs = () => {
  const { translate, theme } = useContext(SettingsContext);

  return (
    <Stack.Navigator>
      {/* Tab Navigator as the main view */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Hide header for Tab.Navigator
      />
      {/* Hidden screens */}
      <Stack.Screen name="Profil" component={Profile} options={
          { headerTitle: translate('Profil'),  
            headerStyle: {
            backgroundColor: theme.tab,
            },
          headerTintColor: theme.text, }} />
      <Stack.Screen name="Postavke" component={Postavke} options={
          { headerTitle: translate('Postavke'),  
            headerStyle: {
            backgroundColor: theme.tab,
            },
          headerTintColor: theme.text, }} />
    </Stack.Navigator>
  );
};

export default LoggedInTabs;
