// screens/ChatScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radii } from '../theme';
import Avatar from '../components/Avatar';
import { API_BASE_URL } from '../config';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    text: 'Mola\u2019a ma\u2019a! Ask me anything, or try a phrase in Batibo.',
    time: nowLabel(),
  },
];

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function Bubble({ message }) {
  const isUser = message.role === 'user';
  const showListen = !isUser && !message.error;
  return (
    <View
      style={[
        styles.bubbleRow,
        { alignItems: isUser ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
          message.error && styles.errorBubble,
        ]}
      >
        <Text style={[styles.bubbleText, isUser && styles.userBubbleText]}>
          {message.text}
        </Text>

        {showListen ? (
          <>
            <View style={styles.bubbleDivider} />
            <Pressable style={styles.listenButton} hitSlop={6}>
              <Feather name="volume-2" size={13} color={colors.heading} />
              <Text style={styles.listenText}>LISTEN</Text>
            </Pressable>
          </>
        ) : null}
      </View>
      <Text style={styles.time}>{message.time}</Text>
    </View>
  );
}

function TypingBubble() {
  return (
    <View style={[styles.bubbleRow, { alignItems: 'flex-start' }]}>
      <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
        <ActivityIndicator size="small" color={colors.body} />
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  // The backend only needs role + content per turn — strip out UI-only
  // fields (id, time, error) before sending conversation history.
  const toApiHistory = (msgs) =>
    msgs
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.text }));

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: nowLabel(),
    };
    const historyForApi = toApiHistory(messages);

    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyForApi }),
      });

      if (!response.ok) {
        throw new Error(`Server responded ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: data.reply,
          time: nowLabel(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: "Elder Anyi couldn't respond \u2014 check that the chat server is running and reachable.",
          time: nowLabel(),
          error: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Avatar name="Elder Anyi" size={40} />
        <View style={{ marginLeft: spacing.sm }}>
          <Text style={styles.headerName}>Elder Anyi</Text>
          <Text style={styles.headerStatus}>AI GUIDE • ONLINE</Text>
        </View>
      </View>
      <View style={styles.headerDivider} />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <Bubble message={item} />}
        ListFooterComponent={sending ? <TypingBubble /> : null}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Composer */}
      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Write in Batibo..."
          placeholderTextColor={colors.placeholder}
          onSubmitEditing={send}
          returnKeyType="send"
          editable={!sending}
        />
        <Pressable
          style={[styles.sendButton, sending && { opacity: 0.5 }]}
          onPress={send}
          disabled={sending}
          hitSlop={6}
        >
          <Feather name="send" size={16} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.heading,
  },
  headerStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.chatOnline,
    letterSpacing: 0.4,
    marginTop: 2,
  },
  headerDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  bubbleRow: {
    marginBottom: spacing.md,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  aiBubble: {
    backgroundColor: colors.chatAiBubble,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.chatUserBubble,
    borderTopRightRadius: 4,
  },
  errorBubble: {
    borderWidth: 1,
    borderColor: colors.primaryTintBorder,
  },
  bubbleDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryTint,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  listenText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.heading,
    marginLeft: 6,
    letterSpacing: 0.3,
  },
  typingBubble: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  bubbleText: {
    fontSize: 14.5,
    lineHeight: 20,
    color: colors.chatAiText,
  },
  userBubbleText: {
    color: colors.chatUserText,
  },
  time: {
    fontSize: 11,
    color: colors.chatMeta,
    marginTop: 4,
    marginHorizontal: 2,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 14.5,
    color: colors.inputText,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
