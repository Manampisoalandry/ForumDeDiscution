import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { FontAwesome5 } from '@expo/vector-icons'; // Importez les icônes de FontAwesome5 ou utilisez une autre bibliothèque d'icônes

const Publication = ({ title, content, contentType, likes, shares,downloads, comments }) => {
  const renderContent = () => {
    if (contentType === 'image') {
      return <Image source={content} style={styles.contentImage} />;
    } else {
      return (
        <View style={styles.contentContainer}>
          <FontAwesome5 name="file-alt" size={48} color="black" />
          <Text style={styles.contentText}>{title}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.publicationContainer}>
      {renderContent()}
      <View style={styles.reactionContainer}>
        <TouchableOpacity style={styles.reactionButton}>
          <Ionicons name="heart" size={24} color="red" />
          <Text>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
           <Ionicons name="chatbox-outline" size={24} color="green" />
           <Text>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Ionicons name="download-outline" size={24} color="black" />
          <Text>{downloads}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Ionicons name="share" size={24} color="blue" />
          <Text>{shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default function Chat({ title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [publications, setPublications] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPublicationTitle, setNewPublicationTitle] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectNewPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image :', error);
    }
  };

  const handleSelectNewFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (result.type === 'success') {
        setSelectedFile(result.uri);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du fichier :', error);
    }
  };

  const handleShare = async () => {
    if (selectedImage || selectedFile) {
      try {
        const newPublication = {
          title: newPublicationTitle || 'Nouvelle publication',
          imageSource: selectedImage ? { uri: selectedImage } : null,
          fileSource: selectedFile ? { uri: selectedFile } : null,
          likes: 0,
          shares: 0,
          downloads: 0,
          comments: 0,
        };
        setPublications([newPublication, ...publications]);
        setSelectedFile(null);
        setNewPublicationTitle('');
        Alert.alert('Succès', 'La publication a été partagée avec succès !');
      } catch (error) {
        console.error('Erreur lors du partage :', error.message);
        Alert.alert('Erreur', 'Une erreur est survenue lors du partage de la publication.');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez sélectionner une image ou un fichier avant de partager.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{title}</Text>
      {publications.map((publication, index) => (
          <Publication
            key={index}
            title={publication.title}
            imageSource={publication.imageSource}
            likes={publication.likes}
            shares={publication.shares}
            downloads={publication.downloads}
            comments={publication.comments}
          />
        ))}
        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          </View>
        )}
        <TouchableOpacity style={styles.selectFileButton} onPress={handleSelectNewFile}>
          <Ionicons name="document-outline" size={24} color="black" />
          <Text style={styles.selectFileButtonText}>Fichiers</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Titre de la publication"
          value={newPublicationTitle}
          onChangeText={setNewPublicationTitle}
          style={styles.titleInput}
        />
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Partager</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  menu: {
    ...StyleSheet.absoluteFillObject,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuText: {
    marginLeft: 10,
  },
  publicationContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  selectPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '30%',
    marginTop: 20,
  },
  selectPhotoButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  selectFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '30%',
    marginTop:10,
  },
  selectFileButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,

  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#FBFBFB',
    borderRadius: 8,
    padding: 10,
    width: '40%',
    marginTop: -40,
    marginLeft: 110,
    backgroundColor: '#F0F0F0',
    fontSize: 16,
    color: 'black',
  },
  shareButton: {
    backgroundColor: '#FF084B',
    padding: 12,
    borderRadius: 8,
    marginTop: -45,
    alignSelf: 'center',
    color: 'white',
    marginLeft: 250,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});