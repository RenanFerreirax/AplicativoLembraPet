import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useReminders } from "../contexts/RemindersContext";
import { Category } from "../../types";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateReminderScreen({ navigation }: any) {
  const { add } = useReminders();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState<Category>("general");
  const [notes, setNotes] = useState("");

  const showDateTimePicker = () => setShowPicker(true);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = () => {
    try {
      if (!title.trim()) {
        alert("Digite um título");
        return;
      }

      const validCategories: Category[] = ["general", "vacina", "banho", "passeio"];
      if (!validCategories.includes(category)) {
        alert("Categoria inválida. Use: general, vacina, banho, passeio");
        return;
      }

      if (!add) {
        alert("Erro: função de adicionar lembrete não encontrada");
        console.error("add function não existe em useReminders()");
        return;
      }

      add({
        title,
        date: date.toISOString(),
        category,
        notes,
        done: false,
      });

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar lembrete:", error);
      alert("Ocorreu um erro ao salvar o lembrete");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titleTop}>Criar Lembrete</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          placeholder="Ex: Vacina"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Data e Hora</Text>
        <TouchableOpacity style={styles.input} onPress={showDateTimePicker}>
          <Text>{date.toLocaleString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          placeholder="general, vacina, banho, passeio"
          value={category}
          onChangeText={(text) => setCategory(text as Category)}
          style={styles.input}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          placeholder="Digite algo opcional..."
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          multiline
        />

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Salvar Lembrete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  topbar: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#125C0B",
    paddingTop: 16,
  },
  back: { fontSize: 26, color: "#fff" },
  titleTop: { color: "#fff", fontSize: 20, fontWeight: "700" },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4, color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
  },
  btn: { backgroundColor: "#125C0B", paddingVertical: 14, borderRadius: 10, marginTop: 10 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" },
});
