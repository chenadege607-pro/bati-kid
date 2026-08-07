// App.js
import 'react-native-gesture-handler'; // must be the first import — required by React Navigation
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenNative from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import LearnScreen from './screens/LearnScreen';
import ChatScreen from './screens/ChatScreen';
import StatsScreen from './screens/StatsScreen';
import BottomTabBar from './components/BottomTabBar';

// Keep Expo's native splash (the OS-level one) visible until we've
// decided our own JS splash can take over — avoids a white flash.
SplashScreenNative.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// The three tabs shown once someone is signed in — Learn / Chat / Stats.
// Uses a custom tabBar so it pixel-matches the mock instead of the
// platform-default tab bar chrome.
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts, check auth token, warm caches, etc. here.
        // await Font.loadAsync({ ... });
        await new Promise((resolve) => setTimeout(resolve, 300));
      } finally {
        setAppReady(true);
        await SplashScreenNative.hideAsync().catch(() => {});
      }
    }
    prepare();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!appReady) {
    // Native splash is still showing; render nothing underneath it.
    return null;
  }

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
