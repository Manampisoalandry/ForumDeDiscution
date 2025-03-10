import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const discussions = [
  {
    id: 1,
    nom: 'John Doe',
    avatar: require('../assets/hero1.jpg'),
    dernierMessage: 'Salut, comment ça va ?',
    messages: [{ text: 'Salut, comment ça va ?', sender: 'John Doe' }],
  },
  {
    id: 2,
    nom: 'Jane Doe',
    avatar: require('../assets/hero2.jpg'),
    dernierMessage: 'Je suis occupé pour le moment. On se parle plus tard.',
    messages: [
      { text: 'Je suis occupé pour le moment. On se parle plus tard.', sender: 'Jane Doe' }
    ],
  },
 
];

const ListeDiscussions = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Conversation', { discussion: item })}>
      <View style={styles.discussionContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.nom}>{item.nom}</Text>
          <Text style={styles.dernierMessage}>{item.dernierMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={discussions}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  discussionContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  nom: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dernierMessage: {
    color: '#888',
  },
});

export default ListeDiscussions;