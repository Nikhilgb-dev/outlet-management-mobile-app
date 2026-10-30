import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConfirmModal({ visible, title, message, onConfirm, onCancel }: any) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={s.overlay}>
        <View style={s.box}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.msg}>{message}</Text>
          <View style={s.row}>
            <TouchableOpacity style={[s.btn, s.cancel]} onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.confirm]} onPress={onConfirm}><Text style={{ color: '#fff' }}>Delete</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  box: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '80%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  msg: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  btn: { padding: 10, borderRadius: 8 },
  cancel: { backgroundColor: '#e5e7eb' },
  confirm: { backgroundColor: '#dc2626' },
});
