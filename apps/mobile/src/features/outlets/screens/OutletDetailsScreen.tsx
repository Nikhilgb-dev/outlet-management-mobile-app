import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { outletApi } from '../services/outlet.service';
import { Outlet } from '../types/outlet.types';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from '../../../components/ConfirmModal';

export default function OutletDetailsScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setOutlet(await outletApi.get(id)); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [id]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  if (loading) return <View style={s.center}><ActivityIndicator size="large" /></View>;
  if (error || !outlet) return <View style={s.center}><Text>{error || 'Outlet not found'}</Text></View>;

  const doDelete = async () => {
    setShowConfirm(false);
    try { await outletApi.remove(id); nav.navigate('OutletList', { toast: 'Outlet deleted successfully' }); }
    catch (e: any) { /* toast on list not shown; alert inline */ }
  };

  return (
    <View style={s.container}>
      <ConfirmModal visible={showConfirm} title="Delete Outlet" message={`Delete ${outlet.name}? This cannot be undone.`} onConfirm={doDelete} onCancel={() => setShowConfirm(false)} />
      <Text style={s.title}>{outlet.name}</Text>
      <Text>Contact: {outlet.contactPerson}</Text>
      <Text>Phone: {outlet.phone}</Text>
      <Text>Address: {outlet.address}</Text>
      <Text>Created: {new Date(outlet.createdAt).toLocaleString()}</Text>
      <Text>Updated: {new Date(outlet.updatedAt).toLocaleString()}</Text>
      <View style={s.btnRow}>
        <TouchableOpacity style={[s.btn, s.btnFlex]} onPress={() => nav.navigate('EditOutlet', { id })}>
          <View style={s.btnContent}><Ionicons name="pencil" size={18} color="#fff" /><Text style={s.btnText}> Edit</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.btnFlex, { backgroundColor: '#DC2626' }]} onPress={() => setShowConfirm(true)}>
          <View style={s.btnContent}><Ionicons name="trash" size={18} color="#fff" /><Text style={s.btnText}> Delete</Text></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  btn: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnFlex: { flex: 1 },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontFamily: 'System', fontSize: 15 },
});

