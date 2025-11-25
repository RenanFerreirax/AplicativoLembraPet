import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    const success = login(email, password);
    if (success) navigation.replace("Main"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Lembra Pet</Text>
      <Text style={styles.welcome}>
        Bem-vindo ao Lembra Pet! 🐾{"\n"}
        O app que te ajuda a lembrar do que seu pet já esqueceu!
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.mainBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.secondaryText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F7FB" },
  appName: { fontSize: 32, fontWeight: "800", color: "#1069F6", marginBottom: 20 },
  welcome: { fontSize: 16, textAlign: "center", color: "#50545C", marginBottom: 20, lineHeight: 22 },
  input: { width: "80%", borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 12, marginBottom: 12, backgroundColor: "#fff" },
  mainBtn: { backgroundColor: "#1069F6", paddingVertical: 14, width: "80%", borderRadius: 12, alignItems: "center", marginBottom: 12 },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  secondaryBtn: { paddingVertical: 10, marginBottom: 20 },
  secondaryText: { fontSize: 16, color: "#1069F6", fontWeight: "600" },
});
