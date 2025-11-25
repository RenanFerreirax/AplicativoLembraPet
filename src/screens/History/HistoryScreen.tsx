import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useReminders } from '../contexts/RemindersContext';
import ReminderCard from '../components/ReminderCard';

export default function HistoryScreen() {
  const { reminders } = useReminders();
  const done = reminders.filter(r => r.done);

  return (
    <ScrollView contentContainerStyle={{padding:16}}>
      <Text style={{fontSize:18, fontWeight:'700', marginBottom:12}}>Histórico</Text>
      {done.length === 0 && <Text style={{color:'#666'}}>Nenhum lembrete concluído</Text>}
      {done.map(d => (
        <ReminderCard key={d.id} item={d} onToggle={()=>{}} onEdit={()=>{}} onRemove={()=>{}} />
      ))}
    </ScrollView>
  );
}
