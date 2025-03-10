import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/core';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import axios from 'axios';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { SERVER_IP } from './constants';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

function DiscussionUsers() {
  const [newMessage, setNewMessage] = useState('');
  const route = useRoute();
  const [messages, setMessages] = useState(null);
  const { userId, discussion, userDiscussion, profile_url } = route.params;
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_IP}/api/discussion/${discussion}/messages/`);
        setMessages(response.data);
        console.log(messages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [newMessage]);

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('sender', userId);
      formData.append('contenu', newMessage);
      formData.append('discussion', discussion);

      images.forEach((image, index) => {
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });

      files.forEach((file, index) => {
        formData.append('files', {
          uri: file.uri,
          type: getTypeFromExtension(file.name),
          name: file.name,
        });
      });

      await axios.post(`${SERVER_IP}/api/discussion/messages/add/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewMessage('');
      setImages([]);
      setFiles([]);
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
      setNewMessage('');
      Keyboard.dismiss();
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.uri]);
    }
  };

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

    if (result.type === 'success') {
      setFiles([...files, result]);
    }
  };

  const getTypeFromExtension = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'pdf':
        return 'application/pdf';
      case 'mp4':
      case 'mov':
      case 'avi':
        return 'video/mp4';
      default:
        return 'application/octet-stream';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile_url }} style={styles.profileImage} />
        <Text style={styles.textDiscussion}>{userDiscussion}</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages &&
          messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messagesContainerUser,
                message.sender.id == userId ? styles.currentUserMessageContainer : styles.otherUserMessageContainer,
              ]}
            >
              <View style={styles.profile}>
                {message.sender.id !== userId && (
                  <View style={styles.profileInfo}>
                    <Image source={{ uri: message.sender.profile_url }} style={styles.profileImage} />
                  </View>
                )}
                <View style={[styles.messageContainerAll]}>
                <View
                  style={[
                    styles.messageBubble,
                    message.sender.id == userId ? styles.currentUserMessageBubble : styles.otherUserMessageBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{message.contenu}</Text>
                </View>
                  {(message.images && message.images.length > 0) || (message.files && message.files.length > 0) ? (
                    <View style={styles.previewContainer}>
                      {message.images &&
                        message.images.length > 0 &&
                        message.images.map((image, index) => (
                          <View key={index} style={styles.previewItem}>
                            <Image source={{ uri: image.url }} style={styles.previewImage} />
                          </View>
                        ))}
                      {message.files &&
                        message.files.length > 0 &&
                        message.files.map((file, index) => (
                          <View key={index} style={styles.previewItem}>
                            <AntDesign name="file1" size={24} color="#2ecc71" />
                            <Text style={styles.fileName}>{file.name}</Text>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handlePickFile}>
          <Ionicons name="attach" size={20} color="#2ecc71" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage}>
          <FontAwesome name="camera" size={20} color="#2ecc71" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrire un message..."
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#2ecc71" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    color: 'white',
  },
  messagesContainer: {
    flex: 1,
    padding: 5,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15,
    width: '100%',
  },
  textDiscussion: {
    // Add your styles here if needed
  },
  messagesContainerUser: {
    flex: 1,
    padding: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  profile: {
    flexDirection: 'row',
    padding: 5,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 4,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainerAll:{
maxWidth: '80%',
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    
  },
  currentUserMessageContainer: {
    alignItems: 'flex-end',
  },
  otherUserMessageContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  currentUserMessageBubble: {
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },
  otherUserMessageBubble: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: 7,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    position: 'relative',
  },
  icon: {
    marginHorizontal: 7,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  icones: {
    left: 160,
  },
  textHeure: {
    textAlign: 'right',
    color: 'grey',
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   // padding: 10,
    //justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight: 0,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
  },
});

export default DiscussionUsers;
