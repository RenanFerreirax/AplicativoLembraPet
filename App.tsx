import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/screens/contexts/AuthContext';
import { RemindersProvider } from './src/screens/contexts/RemindersContext';
import { ThemeProvider } from './src/screens/contexts/ThemeContext';
import Routes from './src/screens/navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <RemindersProvider>
            <Routes />
            <StatusBar style="auto" />
          </RemindersProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
