import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Nouvel état pour indiquer si la connexion a réussi

  const handleLogin = async () => {
    setIsLoading(true); // Activer l'indicateur de chargement

    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      setIsLoading(false); // Désactiver l'indicateur de chargement
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.118:8000/api/users/login/',
        { email, password }
      );
      setError(null); // Effacer votre message
      setLoginSuccess(true); // Définir l'état de connexion réussie à true
      // Supprimer le chargement après 2 secondes
      setTimeout(() => {
        setIsLoading(false);
        setLoginSuccess(false);
        navigation.navigate('Dashboard'); // Navigation vers la page d'accueil après une connexion réussie
      }, 2000);
    } catch (err) {
      Alert.alert('Message', 'Votre email ou mot de passe est incorrect. Veuillez réessayer.');
      setIsLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cher Admin, Bienvenue! 👋</Text>
        <Text style={styles.subtitle}>Vous êtes le seul lead de notre Application</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Adresse Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>
        <View style={[styles.inputContainer, styles.passwordInput]}>
          <Ionicons name="lock-closed" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordShown}
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)}>
            <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color="#007bff"
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Se souvenir de moi</Text>
        </View>
        {isLoading ? ( // Afficher l'indicateur de chargement si isLoading est true
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : loginSuccess ? ( // Afficher l'indicateur de chargement de succès si loginSuccess est true
          <View style={styles.loadingSuccess}>
            <Text style={styles.successText}>Connexion réussie !</Text>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C5588',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
    color: '#FFFFFF',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    borderColor: '#FAFAFA',
  },
  inputFocused: {
    borderColor: '#FAFAFA',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FF084B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingSuccess: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Login;