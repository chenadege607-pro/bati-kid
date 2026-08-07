// components/BottomTabBar.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

const ICONS = {
  Learn: 'book-open',
  Chat: 'message-circle',
  Stats: 'user',
};

// Passed as the `tabBar` prop to a React Navigation bottom Tab.Navigator —
// see MainTabs in App.js. Draws its own bar so it pixel-matches the mock
// instead of relying on the default RN Navigation tab bar styling.
export default function BottomTabBar({ state, navigation }) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? colors.tabActive : colors.tabInactive;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Feather name={ICONS[route.name]} size={22} color={color} />
            <Text style={[styles.label, { color }]}>
              {route.name.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginTop: 4,
  },
});
