import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Toast({ message, type = 'success', visible, onHide }: any) {
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
      const t = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: 80, duration: 200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start(() => onHide?.());
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!visible || !message) return null;
  return (
    <Animated.View style={[s.toast, type === 'error' ? s.err : s.ok, { opacity, transform: [{ translateY }] }]}>
      <Text style={s.text}>{message}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  toast: { position: 'absolute', bottom: 40, left: 24, right: 24, padding: 10, borderRadius: 10, zIndex: 999, alignItems: 'center' },
  ok: { backgroundColor: '#16a34a' },
  err: { backgroundColor: '#dc2626' },
  text: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 13 },
});
