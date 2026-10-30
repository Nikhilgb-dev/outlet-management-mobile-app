import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { outletFormSchema, OutletFormValues } from '../validation/outlet.schema';
import { outletApi } from '../services/outlet.service';

export default function CreateOutletScreen({ navigation }: any) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<OutletFormValues>({ resolver: zodResolver(outletFormSchema) });

  const onSubmit = async (data: OutletFormValues) => {
    setSubmitting(true); setServerError(null);
    try {
      await outletApi.create({ ...data, latitude: 0, longitude: 0 });
      navigation.navigate('OutletList', { toast: 'Outlet created' });
    } catch (e: any) { setServerError(e.message); }
    finally { setSubmitting(false); }
  };

  const fields: { name: keyof OutletFormValues; label: string; keyboard?: any; placeholder: string }[] = [
    { name: 'name', label: 'Outlet Name', placeholder: 'e.g. Main Street Store' },
    { name: 'contactPerson', label: 'Contact Person', placeholder: 'e.g. John Doe' },
    { name: 'phone', label: 'Phone', keyboard: 'phone-pad', placeholder: '+1 555 0000' },
    { name: 'address', label: 'Address', placeholder: 'Street, City' },
  ];

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      {fields.map((f) => (
        <View key={f.name} style={s.field}>
          <Text style={s.label}>{f.label}</Text>
          <Controller control={control} name={f.name} render={({ field: { onChange, value } }) => (
            <TextInput style={[s.input, errors[f.name] && s.inputErr]} value={String(value ?? '')} onChangeText={onChange} keyboardType={f.keyboard} placeholder={f.placeholder} placeholderTextColor="#9ca3af" />
          )} />
          {errors[f.name] && <Text style={s.err}>{errors[f.name]?.message}</Text>}
        </View>
      ))}
      {serverError && <Text style={s.err}>{serverError}</Text>}
      <TouchableOpacity style={s.btn} onPress={handleSubmit(onSubmit)} disabled={submitting} activeOpacity={0.8}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Create Outlet</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  field: { marginBottom: 14 },
  label: { marginBottom: 6, fontWeight: '700', color: '#1e3a8a' },
  input: { borderWidth: 1, borderColor: '#bfdbfe', borderRadius: 10, padding: 12, backgroundColor: '#fff', color: '#111827' },
  inputErr: { borderColor: '#f87171' },
  err: { color: '#dc2626', marginTop: 4, fontSize: 12 },
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8, shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 6, elevation: 3 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
