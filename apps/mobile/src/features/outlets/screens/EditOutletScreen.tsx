import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { outletFormSchema, OutletFormValues } from '../validation/outlet.schema';
import { outletApi } from '../services/outlet.service';

export default function EditOutletScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<OutletFormValues>({ resolver: zodResolver(outletFormSchema) });

  useEffect(() => {
    (async () => {
      try {
        const o = await outletApi.get(id);
        reset({ name: o.name, contactPerson: o.contactPerson, phone: o.phone, address: o.address, latitude: o.latitude, longitude: o.longitude });
      } catch (e: any) { setServerError(e.message); }
      finally { setLoading(false); }
    })();
  }, [id, reset]);

  const onSubmit = async (data: OutletFormValues) => {
    setSubmitting(true); setServerError(null);
    try { await outletApi.update(id, data); nav.navigate('OutletList', { toast: 'Outlet updated successfully' }); }
    catch (e: any) { setServerError(e.message); }
    finally { setSubmitting(false); }
  };

  if (loading) return <View style={s.center}><ActivityIndicator size="large" /></View>;

  const fields: { name: keyof OutletFormValues; label: string; keyboard?: any }[] = [
    { name: 'name', label: 'Outlet Name' },
    { name: 'contactPerson', label: 'Contact Person' },
    { name: 'phone', label: 'Phone', keyboard: 'phone-pad' },
    { name: 'address', label: 'Address' },
    { name: 'latitude', label: 'Latitude', keyboard: 'numeric' },
    { name: 'longitude', label: 'Longitude', keyboard: 'numeric' },
  ];

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      {fields.map((f) => (
        <View key={f.name} style={s.field}>
          <Text style={s.label}>{f.label}</Text>
          <Controller control={control} name={f.name} render={({ field: { onChange, value } }) => (
            <TextInput style={s.input} value={String(value ?? '')} onChangeText={onChange} keyboardType={f.keyboard} />
          )} />
          {errors[f.name] && <Text style={s.err}>{errors[f.name]?.message}</Text>}
        </View>
      ))}
      {serverError && <Text style={s.err}>{serverError}</Text>}
      <TouchableOpacity style={s.btn} onPress={handleSubmit(onSubmit)} disabled={submitting}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Save Changes</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  field: { marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  err: { color: 'red', marginTop: 4 },
  btn: { backgroundColor: '#1e40af', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
