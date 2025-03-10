import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedDiscussion, setExpandedDiscussion] = useState(null);

  // Liste de discussions fictive pour affichage
  const discussions = [
    { id: '1', title: 'Discussion 1', sender: require('../assets/hero1.jpg'), messages: ['Salut', 'Salut'] },
    { id: '2', title: 'Discussion 2', sender: require('../assets/hero2.jpg'), messages: ['Mots de passe', 'Message 4'] },
    { id: '3', title: 'Discussion 3', sender: require('../assets/hero3.jpg'), messages: ['Message 5', 'Message 6'] },
    { id: '4', title: 'Discussion 4', sender: require('../assets/hero1.jpg'), messages: ['Message 7', 'Message 8'] },
    { id: '5', title: 'Discussion 5', sender: require('../assets/hero3.jpg'), messages: ['Message 9', 'Message 10'] },
    { id: '6', title: 'Discussion 6', sender: require('../assets/hero2.jpg'), messages: ['Message 11', 'Message 12'] },
    { id: '7', title: 'Discussion 7', sender: require('../assets/hero1.jpg'), messages: ['Message 13', 'Message 14'] },
    { id: '8', title: 'Discussion 8', sender: require('../assets/hero3.jpg'), messages: ['Message 15', 'Message 16'] },
  ];

  // Fonction pour gérer le clic sur le bouton de menu
  const handleMenuButtonPress = () => {
    setMenuVisible(!menuVisible); // Inverse la visibilité du menu
  };

  // Fonction pour gérer le clic sur un élément du menu
  const handleMenuItemPress = (itemName) => {
    console.log(`Vous avez cliqué sur "${itemName}"`);
    // Ajoutez ici le code pour traiter le clic sur chaque élément du menu
  };

  // Fonction pour rendre chaque élément de la liste de discussions
  const renderDiscussionItem = ({ item }) => {
    const isExpanded = expandedDiscussion === item.id;
    return (
      <View style={styles.discussionItem}>
        {/* Image de l'expéditeur */}
        <Image source={item.sender} style={styles.senderImage} />
        <View style={styles.discussionContent}>
          <TouchableOpacity onPress={() => handleExpandCollapse(item.id)} style={styles.expandCollapseButton}>
            <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.discussionTitle}>{item.title}</Text>
          {isExpanded && (
            <View style={styles.messagesContainer}>
              {item.messages.map((message, index) => (
                <Text key={index} style={styles.message}>{message}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  // Fonction pour gérer l'expansion ou la réduction d'une discussion
  const handleExpandCollapse = (discussionId) => {
    setExpandedDiscussion(expandedDiscussion === discussionId ? null : discussionId);
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert(
     'Déconnexion',
     'Êtes-vous sûr de vouloir vous déconnecter ?',
     [
       { text: 'Annuler', style: 'cancel' },
       { text: 'Oui', onPress: () => navigation.navigate('Login') }, // Naviguer vers la page de connexion
     ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Bouton de menu */}
      <TouchableOpacity onPress={handleMenuButtonPress} style={styles.menuButton}>
        <Ionicons name={menuVisible ? 'close' : 'menu'} size={24} color="black" />
      </TouchableOpacity>
      {/* Image de profil */}
      <Image source={require('../assets/hero1.jpg')} style={styles.profileIcon} />
      {/* Contenu du menu (affiché ou masqué en fonction de menuVisible) */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleMenuItemPress('Accueil')} style={styles.menuItem}>
            <Ionicons name="home" size={20} color="#333" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuItemPress('Profil')} style={styles.menuItem}>
            <Ionicons name="person" size={20} color="#333" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuItemPress('Paramètres')} style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="#333" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Ionicons name="log-out" size={20} color="#333" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Liste des discussions */}
      <FlatList
        data={discussions}
        renderItem={renderDiscussionItem}
        keyExtractor={(item) => item.id}
        style={styles.discussionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 1,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 400,
    marginLeft: 50,
    marginBottom: 550,
    marginTop:50,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
  discussionList: {
    flex: 1,
    marginTop: -500, // Ajustez cet espacement en fonction de vos besoins
    paddingHorizontal: 20,
  },
  discussionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  discussionContent: {
    flex: 1,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expandCollapseButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  messagesContainer: {
    marginLeft: 50, // Décalage pour les messages par rapport à l'image de l'expéditeur
  },
  message: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Home;