// screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../theme';
import Avatar from '../components/Avatar';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';

// Static sample data — wire this up to your backend.
const STATS = [
  { label: 'DAY STREAK', value: '12' },
  { label: 'WORDS LEARNED', value: '148' },
  { label: 'QUIZ AVERAGE', value: '86%' },
  { label: 'MINUTES SPOKEN', value: '212' },
];

const LESSONS = [
  { id: 'l1', title: 'Morning Greetings', level: 'Beginner', progress: 0.6 },
  { id: 'l2', title: 'Family Bonds', level: 'Beginner', progress: 0 },
  { id: 'l3', title: 'The Market', level: 'Intermediate', progress: 0 },
  { id: 'l4', title: 'Tonal Nuances III', level: 'Advanced', progress: 0 },
];

export default function StatsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile header */}
      <View style={styles.header}>
        <Avatar name="Ambe Chenwi" size={48} />
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          <Text style={styles.name}>Ambe Chenwi</Text>
          <Text style={styles.email}>ambe.chenwi@example.com</Text>
          <Text style={styles.level}>LEVEL 2 • BEGINNER PATH</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard label={STATS[0].label} value={STATS[0].value} />
            <StatCard label={STATS[1].label} value={STATS[1].value} />
          </View>
          <View style={styles.statsRow}>
            <StatCard label={STATS[2].label} value={STATS[2].value} />
            <StatCard label={STATS[3].label} value={STATS[3].value} />
          </View>
        </View>

        <Text style={styles.sectionLabel}>LESSON MASTERY</Text>

        {LESSONS.map((lesson) => (
          <View key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonTopRow}>
              <View>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonLevel}>{lesson.level}</Text>
              </View>
              <Text style={styles.lessonPct}>
                {Math.round(lesson.progress * 100)}%
              </Text>
            </View>
            <ProgressBar progress={lesson.progress} />
          </View>
        ))}

        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && { opacity: 0.6 },
          ]}
          onPress={() => {
            const parent = navigation.getParent();
            (parent || navigation).replace('Login');
          }}
        >
          <Feather name="log-out" size={16} color={colors.heading} />
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.headerBand,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  name: {
    fontFamily: typography.headingFamily,
    fontSize: 17,
    fontWeight: '700',
    color: colors.heading,
  },
  email: {
    fontSize: 13,
    color: colors.body,
    marginTop: 2,
  },
  level: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.4,
    marginTop: 6,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  statsGrid: {
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.body,
    marginBottom: spacing.sm,
  },
  lessonCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  lessonTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.heading,
  },
  lessonLevel: {
    fontSize: 12,
    color: colors.body,
    marginTop: 2,
  },
  lessonPct: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.bodyStrong,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingVertical: 15,
    marginTop: spacing.sm,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.heading,
    marginLeft: spacing.xs,
  },
});
