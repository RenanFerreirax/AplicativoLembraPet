import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Category } from "../../types";
import { useReminders } from "../contexts/RemindersContext";

export default function CreateReminderScreen({ navigation }: any) {
  const { add } = useReminders();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [category, setCategory] = useState<Category>("vacina");
  const [notes, setNotes] = useState("");

  const save = () => {
    if (!title) return alert("Informe um título");

    add({
      title,
      date,
      category,
      done: false,
      notes,
    });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Criar Lembrete</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Vacina de Raiva"
      />

      <Text style={styles.label}>Data e Hora (ISO)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.row}>
        {[
          "vacina",
          "medicamento",
          "consulta",
          "higiene",
          "passeio",
          "alimentacao",
        ].map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c as Category)}
            style={[
              styles.chip,
              category === c && styles.chipActive,
            ]}
          >
            <Text style={{ textTransform: "capitalize" }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notas adicionais"
        multiline
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar Lembrete" onPress={save} />
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
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  chip: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#EAF2FF",
    borderColor: "#1069F6",
  },
});
