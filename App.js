// App.js
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenNative from 'expo-splash-screen';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';

// Keep Expo's native splash (the OS-level one) visible until we've
// decided our own JS splash can take over — avoids a white flash.
SplashScreenNative.preventAutoHideAsync().catch(() => {});

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

  return (
    <>
      <StatusBar style="dark" />
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <LoginScreen />
      )}
    </>
  );
}
