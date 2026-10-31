import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { outletApi } from '../services/outlet.service';
import { Outlet } from '../types/outlet.types';
import Toast from '../../../components/Toast';

export default function OutletListScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setOutlets(await outletApi.list(search)); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [search]);

  useFocusEffect(useCallback(() => {
    load();
    const t = route.params?.toast;
    if (t) { setToast({ msg: t, type: 'success' }); nav.setParams({ toast: undefined }); }
  }, [load, route.params]));

  if (loading) return <View style={s.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={s.center}><Text>{error}</Text><TouchableOpacity onPress={load}><Text>Retry</Text></TouchableOpacity></View>;

  return (
    <View style={s.container}>
      <Toast message={toast?.msg} type={toast?.type} visible={!!toast} onHide={() => setToast(null)} />
      <Text style={s.subtitle}>Total: {outlets.length}</Text>
      <TextInput style={s.search} placeholder="Search by name, contact, phone" value={search} onChangeText={setSearch} onSubmitEditing={load} />
      <FlatList data={outlets} keyExtractor={(i) => i.id} ListEmptyComponent={<Text style={s.empty}>No outlets found</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => nav.navigate('OutletDetails', { id: item.id })}>
            <Text style={s.name}>{item.name}</Text>
            <Text>{item.contactPerson}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.address}</Text>
          </TouchableOpacity>
        )} />
      <TouchableOpacity style={s.fab} onPress={() => nav.navigate('CreateOutlet')}>
        <Text style={s.fabText}>+ Add Outlet</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e40af' },
  subtitle: { marginBottom: 8, color: '#555' },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginBottom: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#1e40af', padding: 14, borderRadius: 30 },
  fabText: { color: '#fff', fontWeight: 'bold' },
});
