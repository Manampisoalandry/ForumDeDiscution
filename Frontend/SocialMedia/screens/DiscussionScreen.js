import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Search from './Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_IP } from './constants';

function DiscussionScreen() {
const navigation = useNavigation();
const [messages, setMessages] = useState(null)
const [userId, setUserId] = useState(null)  
const [userDiscussion, setUserDiscussion] = useState(null)
useEffect(() => {
  const fetchUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { id } = JSON.parse(userData);
        setUserId(parseInt(id));
      }
    } catch (error) {
     
    }
  };

  fetchUserId();
  
}, []);

useEffect(()=>{
 
 const fetchData = async ()=>{
    try{
      
        const response = await axios.get(`${SERVER_IP}/api/users/${userId}/userdiscussions/`);
        setMessages(response.data)
        
    }
    catch(err){
      console.log(err)
    }
 };
 if (userId !== null) {
   fetchData();
}
}, [userId, userDiscussion]);

const handleMessage = (discussion, userDiscussion, profile_url) => {
    try{
      navigation.navigate('DiscussionUsers',{userId, discussion, userDiscussion, profile_url })
     
    }
    catch(err){
      console.error("handle message error:  "+err)
    }

  
}
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Messages</Text>
        <Search />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text} >Liste des messages reçues</Text>
        
      </View>
      <View>
        
          {messages && messages.map((message,index) => (
            <TouchableOpacity key={index} onPress={() => handleMessage(message.discussion, message.nom, message.profile_url)}>
            <View  style={styles.messageContainer}>
              <View style={styles.avatarContainer}>
                <Image source={{uri:message.profile_url}} style={styles.avatar} />
                
              </View>
              <View style={styles.mesContainer}>
                  
                  <Text style={styles.nom}>{message.nom}</Text>
                  {/*  */}
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.messageText}>
                  <Text>{message.sender['id']==userId ? "vous:" : `${(message.sender['nom'].split(' '))[0]}: `}</Text>
                  {message.contenu}</Text>
              </View>
                <View style={styles.time_elapsed}>
                  <Text>{message.time_elapsed}</Text>
                </View>            
            </View>
            </TouchableOpacity>
       
          ))}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'space-between',
    padding: 1,
    
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 4
    
  },
  avatarContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  listContainer: {
   justifyContent: 'center',
   backgroundColor: '#f0f0f0',
   color: "grey",
   height: 40,
   

  },
   mesContainer: {
   justifyContent: 'space-between',
   paddingVertical: 0,
   paddingRight:10,
   width: '65%',
  },
  time_elapsed:{
    position: 'relative',
    width: '20%',
    textAlign: 'right'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nom: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: '500',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  viewMessage:{
    flexDirection: 'row',
  }
});

export default DiscussionScreen;
