// screens/LoginScreen.js
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
import { colors, spacing, radii, typography } from '../theme';

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState('learner'); // 'learner' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          {/* Logo mark */}
          <View style={styles.logoSquare}>
            <View style={styles.logoDot} />
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Welcome to Batibo</Text>
          <Text style={styles.subheading}>
            Reconnect with the rhythm of your heritage through spoken word.
          </Text>

          {/* Role segmented control */}
          <View style={styles.segmentTrack}>
            <Pressable
              onPress={() => setRole('learner')}
              style={[
                styles.segmentButton,
                role === 'learner' && styles.segmentButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  role === 'learner' && styles.segmentTextActive,
                ]}
              >
                LEARNER
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRole('admin')}
              style={[
                styles.segmentButton,
                role === 'admin' && styles.segmentButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  role === 'admin' && styles.segmentTextActive,
                ]}
              >
                ADMIN
              </Text>
            </Pressable>
          </View>

          {/* Email */}
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.body}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          {/* Password */}
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.body}
            secureTextEntry
          />

          {/* Primary CTA */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={() => navigation.replace('Main')}
          >
            <Text style={styles.primaryButtonText}>Continue learning</Text>
          </Pressable>

          {/* Secondary CTA */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.secondaryButtonText}>Join the community</Text>
          </Pressable>

          <View style={{ flex: 1 }} />

          {/* Footer */}
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>Accessing the Elder's Path • v2.4</Text>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  logoSquare: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.logoBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.logoDot,
  },
  heading: {
    fontFamily: typography.headingFamily,
    fontSize: 30,
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
  segmentTrack: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrack,
    borderRadius: radii.pill,
    padding: 4,
    marginBottom: spacing.lg,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.segmentInactiveText,
  },
  segmentTextActive: {
    color: colors.white,
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
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.heading,
    fontSize: 16,
    fontWeight: '600',
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.footerText,
    marginBottom: spacing.sm,
  },
});
