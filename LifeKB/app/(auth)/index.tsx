import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Sign in successful:', data.session ? 'Has session' : 'No session');
      
      // Explicitly navigate after successful sign in
      if (data.session) {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Sign up result:', data);
      
      if (data.session) {
        // User was auto-signed in (if email confirmation is disabled)
        router.replace('/(tabs)');
      } else {
        Alert.alert(
          'Success', 
          'Account created successfully! Please check your email for verification instructions.',
          [{ text: 'OK', onPress: () => setIsSignUp(false) }]
        );
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert('Error', error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    Alert.alert('Info', 'Google Sign In would be implemented here.');
    // In a real implementation, you would use Supabase OAuth
    // This requires additional setup with Expo AuthSession
  };

  const handleAppleSignIn = async () => {
    Alert.alert('Info', 'Apple Sign In would be implemented here.');
    // In a real implementation, you would use Supabase OAuth
    // This requires additional setup with Expo AuthSession
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          {isSignUp ? 'Sign up to create your knowledge base' : 'Sign in to continue to your knowledge base'}
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].background, color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].background, color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Password"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={isSignUp ? handleSignUp : handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={[styles.switchButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault }]} />
        <Text style={[styles.dividerText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Or continue with
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault }]} />
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
          onPress={handleGoogleSignIn}
        >
          <Text style={[styles.socialButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
          onPress={handleAppleSignIn}
        >
          <Text style={[styles.socialButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Apple
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 8,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 32,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
  },
}); 