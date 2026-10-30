import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Toast({ message, type = 'success', visible, onHide }: any) {
  const [opacity] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      const t = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => onHide?.());
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [visible]);
  if (!visible || !message) return null;
  return (
    <Animated.View style={[s.toast, type === 'error' ? s.err : s.ok, { opacity }]}>
      <Text style={s.text}>{message}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  toast: { position: 'absolute', top: 50, left: 20, right: 20, padding: 12, borderRadius: 8, zIndex: 999 },
  ok: { backgroundColor: '#16a34a' },
  err: { backgroundColor: '#dc2626' },
  text: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
