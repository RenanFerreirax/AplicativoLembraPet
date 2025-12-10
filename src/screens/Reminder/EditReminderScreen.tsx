import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useReminders } from "../contexts/RemindersContext";

export default function EditReminderScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { reminders, updateReminder } = useReminders();

  const rem = reminders.find((r) => r.id === id);

  const [title, setTitle] = useState(rem?.title ?? "");
  const [date, setDate] = useState(rem?.date ?? "");
  const [notes, setNotes] = useState(rem?.notes ?? "");

  useEffect(() => {
    if (!rem) navigation.goBack();
  }, [rem]);

  const save = () => {
    if (!title) return alert("Informe título");

    updateReminder(id, { title, date, notes });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Editar Lembrete</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Data e Hora (ISO)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar alterações" onPress={save} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F6F7FB",
    flexGrow: 1,
  },
  backBtn: { marginBottom: 20 },
  backText: { color: "#1069F6", fontSize: 16, fontWeight: "600" },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8 },
});
