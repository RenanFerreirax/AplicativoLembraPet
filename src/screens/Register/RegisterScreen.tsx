import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) return alert("Preencha todos os campos");
    const success = register(name.trim(), email.trim(), password);
    if (success) navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: "padding", android: undefined })}>
      <Text style={styles.title}>Criar Conta</Text>

      <View style={{ marginTop: 12 }}>
        <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
          <Text style={styles.primaryText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#F6F7FB" },
  title: { fontSize: 22, fontWeight: "800", color: "#1069F6", alignSelf: "center", marginBottom: 8 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  primaryBtn: { backgroundColor: "#1069F6", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 6 },
  primaryText: { color: "#fff", fontWeight: "700" },
  linkBtn: { marginTop: 12, alignItems: "center" },
  linkText: { color: "#1069F6", fontWeight: "600" },
});
