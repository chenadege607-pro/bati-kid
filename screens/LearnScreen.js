// screens/LearnScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../theme';
import Avatar from '../components/Avatar';

// Static sample data — wire this up to your backend / lesson store.
const LESSONS = [
  {
    id: '1',
    number: 1,
    title: 'Morning Greetings',
    subtitle: "Mola'a ma'a • Beginner",
    status: 'active', // active | locked | done
    align: 'center',
  },
  {
    id: '2',
    title: 'Family Bonds',
    subtitle: "Ndap ma'a • Beginner",
    status: 'locked',
    align: 'right',
  },
  {
    id: '3',
    title: 'The Market',
    subtitle: "Nda'a ntoh • Intermediate",
    status: 'locked',
    align: 'left',
  },
];

function LessonNode({ lesson }) {
  const isActive = lesson.status === 'active';
  const alignStyle =
    lesson.align === 'right'
      ? { alignItems: 'flex-end', paddingRight: '10%' }
      : lesson.align === 'left'
      ? { alignItems: 'flex-start', paddingLeft: '10%' }
      : { alignItems: 'center' };

  return (
    <View style={[styles.node, alignStyle]}>
      {isActive ? (
        <View style={styles.activeRing}>
          <View style={styles.activeCircle}>
            <Text style={styles.activeNumber}>{lesson.number}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.lockedCircle}>
          <Feather name="lock" size={20} color={colors.lockedIcon} />
        </View>
      )}
      <Text style={[styles.lessonTitle, !isActive && styles.lessonTitleLocked]}>
        {lesson.title}
      </Text>
      <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
    </View>
  );
}

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar name="Ambe Chenwi" size={40} />
          <View style={{ marginLeft: spacing.sm }}>
            <Text style={styles.level}>LEVEL 2</Text>
            <Text style={styles.name}>Ambe Chenwi</Text>
          </View>
        </View>
        <View style={styles.streakPill}>
          <View style={styles.streakDot} />
          <Text style={styles.streakText}>12 DAY STREAK</Text>
        </View>
      </View>

      {/* Path */}
      <View style={styles.pathWrap}>
        <ScrollView
          contentContainerStyle={styles.pathContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timelineLine} pointerEvents="none" />
          {LESSONS.map((lesson) => (
            <LessonNode key={lesson.id} lesson={lesson} />
          ))}
        </ScrollView>

        {/* Decorative scroll affordances, matching the mock */}
        <View style={styles.sideControls}>
          <Feather name="chevron-up" size={18} color={colors.body} />
          <View style={styles.sideTrack} />
          <Feather name="chevron-down" size={18} color={colors.body} />
        </View>
      </View>

      <View style={styles.bottomScrollRow}>
        <Feather name="chevron-left" size={16} color={colors.body} />
        <View style={styles.bottomTrack}>
          <View style={styles.bottomTrackFill} />
        </View>
        <Feather name="chevron-right" size={16} color={colors.body} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  level: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.body,
    letterSpacing: 0.4,
  },
  name: {
    fontFamily: typography.headingFamily,
    fontSize: 16,
    fontWeight: '700',
    color: colors.heading,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.streakDot,
    marginRight: 6,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.heading,
    letterSpacing: 0.3,
  },
  pathWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  pathContent: {
    flexGrow: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.timelineLine,
    borderStyle: 'dashed',
  },
  node: {
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  activeRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  activeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNumber: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  lockedCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lockedCircle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.heading,
    marginBottom: 2,
  },
  lessonTitleLocked: {
    color: colors.lockedText,
  },
  lessonSubtitle: {
    fontSize: 12,
    color: colors.body,
  },
  sideControls: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  sideTrack: {
    width: 4,
    flex: 1,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  bottomScrollRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  bottomTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  bottomTrackFill: {
    width: '35%',
    height: '100%',
    backgroundColor: colors.body,
    borderRadius: 2,
  },
});
