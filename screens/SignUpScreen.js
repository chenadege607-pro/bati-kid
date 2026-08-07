// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../theme';

const REASONS = [
  'My child should speak it',
  'I want to speak with family',
  'Reconnect with home',
];

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState(REASONS[0]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            style={styles.backRow}
            onPress={() => navigation.goBack()}
            hitSlop={10}
          >
            <Feather name="arrow-left" size={18} color={colors.body} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          <Text style={styles.heading}>Join the community</Text>
          <Text style={styles.subheading}>
            A few words about you, and Elder Anyi will shape your first
            lessons.
          </Text>

          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Ambe Chenwi"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.placeholder}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <Text style={styles.label}>WHY ARE YOU LEARNING?</Text>
          {REASONS.map((option) => {
            const selected = option === reason;
            return (
              <Pressable
                key={option}
                onPress={() => setReason(option)}
                style={[styles.reasonChip, selected && styles.reasonChipActive]}
              >
                <Text
                  style={[
                    styles.reasonText,
                    selected && styles.reasonTextActive,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={() => navigation.replace('Main')}
          >
            <Text style={styles.primaryButtonText}>Begin the path</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backText: {
    color: colors.body,
    fontSize: 15,
    marginLeft: spacing.xs,
  },
  heading: {
    fontFamily: typography.headingFamily,
    fontSize: 28,
    fontWeight: '700',
    color: colors.heading,
    marginBottom: spacing.sm,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.body,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.body,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.inputText,
    marginBottom: spacing.md,
  },
  reasonChip: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  reasonChipActive: {
    backgroundColor: colors.primaryTint,
    borderColor: colors.primaryTintBorder,
  },
  reasonText: {
    fontSize: 15,
    color: colors.inputText,
  },
  reasonTextActive: {
    color: colors.heading,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
