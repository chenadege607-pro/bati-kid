// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing, typography } from '../theme';

// Shown while the app boots (fonts/assets loading, auth check, etc).
// Calls onFinish() once its minimum display time has elapsed AND the
// parent says it's ready — see App.js for how the two are combined.
export default function SplashScreen({ onFinish }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    // Minimum time the splash stays on screen, so it never just flashes.
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ scale }] },
        ]}
      >
        <View style={styles.logoSquare}>
          <View style={styles.logoDot} />
        </View>
        <Text style={styles.appName}>Batibo</Text>
        <Text style={styles.tagline}>The Elder's Path</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoSquare: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.logoBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.logoDot,
  },
  appName: {
    fontFamily: typography.headingFamily,
    fontSize: 28,
    fontWeight: '700',
    color: colors.heading,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 14,
    color: colors.body,
  },
});
