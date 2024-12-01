import React, { useState, useEffect } from 'react';
import API from '../utils/api'; // Adjust the path if necessary

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

// Background images
const images = [
  require('../assets/login-bg-1.png'),
  require('../assets/login-bg-2.png'),
  require('../assets/login-bg-3.png'),
  require('../assets/login-bg-4.png'),
];

const LoginScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up interval
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both email and password are required!');
      return;
    }
  
    try {
      const response = await API.post('/login', { email, password });
      console.log('API Response:', response.data); // Log for debugging
  
      if (response.status === 200) {
        const { token } = response.data;
  
        // Store the token securely
        await AsyncStorage.setItem('userToken', token);
  
        // Navigate to HomeScreen
        navigation.navigate('Home', { token });
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
  
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Server error');
      } else if (error.request) {
        Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };
  
  

  return (
    <ImageBackground source={images[currentImageIndex]} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>MAP for Coaches</Text>
          <Text style={styles.subtitle}>Sign in by Email and Password</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>FORGOT PASSWORD?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    marginTop: 15,
    fontSize: 14,
  },
});

export default LoginScreen;
