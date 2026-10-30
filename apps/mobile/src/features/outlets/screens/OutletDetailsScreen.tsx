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
      <Text>Latitude: {outlet.latitude}</Text>
      <Text>Longitude: {outlet.longitude}</Text>
      <Text>Created: {new Date(outlet.createdAt).toLocaleString()}</Text>
      <Text>Updated: {new Date(outlet.updatedAt).toLocaleString()}</Text>
      <TouchableOpacity style={s.btn} onPress={() => nav.navigate('EditOutlet', { id })}><Ionicons name="pencil" size={18} color="#fff" /><Text style={s.btnText}> Edit</Text></TouchableOpacity>
      <TouchableOpacity style={[s.btn, { backgroundColor: 'red' }]} onPress={() => setShowConfirm(true)}><Ionicons name="trash" size={18} color="#fff" /><Text style={s.btnText}> Delete</Text></TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  btn: { backgroundColor: '#1e40af', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

