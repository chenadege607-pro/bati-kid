// components/Avatar.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Renders a photo if `uri` is given, otherwise initials on a warm tint.
// Wrapped in a thin gold ring to match the profile mocks.
export default function Avatar({ uri, name = '', size = 44 }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const ringSize = size + 6;

  return (
    <View
      style={[
        styles.ring,
        { width: ringSize, height: ringSize, borderRadius: ringSize / 2 },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.38 }]}>
            {initials || '•'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: 2,
    borderColor: colors.avatarRing,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  fallback: {
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.primaryPressed,
    fontWeight: '700',
  },
});
