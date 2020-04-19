/* eslint-disable react/prop-types */
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function GoBackIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  );
}

function Sign() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function New() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerLeftContainerStyle: { marginLeft: 20 },
      }}>
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={({ navigation }) => ({
          title: 'Selecione o prestador',
          headerLeft: () => (
            <GoBackIcon onPress={() => navigation.navigate('DashBoard')} />
          ),
        })}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) => ({
          title: 'Selecione o horário',
          headerLeft: () => <GoBackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={({ navigation }) => ({
          title: 'Confirmar agendamento',
          headerLeft: () => <GoBackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        style: {
          backgroundColor: '#8d41a8',
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="DashBoard"
        component={Dashboard}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color }) => (
            <Icon name="event" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={New}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Agendar',
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" size={20} color={color} />
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function createRouter(signed) {
  return () => (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {signed ? (
          <Stack.Screen name="App" component={App} />
        ) : (
          <Stack.Screen name="Sign" component={Sign} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
