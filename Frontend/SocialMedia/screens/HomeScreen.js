import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, filter, TextInput, ActivityIndicator, Button, Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import MessageItem from './MessageItem';
import SearchScreen from './SearchScreen';
import * as ImagePicker from 'expo-image-picker';
import Chat from './Chat';

import NavBar from './navBar';
import Tab from './tab';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/core';
import InteractableView from 'react-native-interactable';
function HomeScreen() {
  const navigation = useNavigation();
  const handlePublish = () => {   
    navigation.navigate('Post'); 
  };

    return (
      <View style={styles.container}>
        <View style={styles.container_header}>
            <NavBar/>

        </View>
       
        <View style={styles.tabContent}>
        <Tab/>
        </View>
        
      </View>
    );
  }
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: 'white',
      
      
    },
    container_header: {
      top : 50,
      display: 'flex',
      height: 100, 
      
    },
    tabContent: {
      padding:1,
      flex: 1, 
      
      backgroundColor:'white',
    },
    container_body: {
      backgroundColor: 'grey',
      height: 90,
    },
    container_tab: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        margingTop: 25,
        marginBottom: 0, 
        backgroundColor: 'white'
      

    },
    profileContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      marginRight: 10,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    publishContainer: {
      flex: 1,
      marginRight: 10,
      padding: 15,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
    },
    publishText: {
      color: '#666666',
    },
    publishButton: {
      backgroundColor: '#2ecc71', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    publishButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });