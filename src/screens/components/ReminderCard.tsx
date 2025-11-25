import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Reminder } from '../../types';
import { format } from 'date-fns';

type Props = {
  item: Reminder;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function ReminderCard({ item, onToggle, onEdit, onRemove }: Props) {
  return (
    <View style={[styles.card, item.done && styles.done]}>
      <View style={[styles.leftBar, { backgroundColor: colorByCategory(item.category) }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{format(new Date(item.date), 'dd/MM/yyyy HH:mm')}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.actionBtn}>
          <Text style={styles.actionText}>{item.done ? 'Undo' : '✓'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.actionBtn}>
          <Text style={styles.actionText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.actionBtn}>
          <Text style={[styles.actionText, { color: '#E05A5A' }]}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function colorByCategory(cat: string) {
  switch (cat) {
    case 'vacina': return '#1069F6';
    case 'medicamento': return '#2BB673';
    case 'consulta': return '#F5B041';
    case 'higiene': return '#FF9B50';
    case 'passeio': return '#A13DFF';
    case 'alimentacao': return '#FFA726';
    default: return '#C4C4C4';
  }
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, elevation: 2, alignItems: 'center', overflow: 'hidden' },
  leftBar: { width: 6, height: '100%' },
  body: { flex:1, padding: 12 },
  title: { fontWeight: '700', fontSize: 16 },
  date: { color: '#707582', marginTop: 6 },
  actions: { paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
  actionBtn: { padding: 6 },
  actionText: { fontSize: 14, color: '#333' },
  done: { opacity: 0.5 }
});
