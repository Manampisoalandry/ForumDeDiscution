import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/core';
import { SERVER_IP } from './constants';

function Notification() {
    const [notifications, setNotifications] = useState(null);
    const route = useRoute();
    const { userId } = route.params;
    const navigation = useNavigation()

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${SERVER_IP}/api/users/${userId}/notifications/`);
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const formatTimeElapsed = (timeElapsed) => {
        if (timeElapsed > 60 * 24) {
            const hours = parseInt(timeElapsed / (60 * 24));
            return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        } else if (timeElapsed < 60) {
            return `il y a ${parseInt(timeElapsed)} min`;
        } else {
            const hours = parseInt(timeElapsed / 60);
            return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        }
    };

    const handle_notification = (publicationId)=>{
        navigation.navigate('Comment',{publicationId})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notification</Text>
            </View>
            <ScrollView>
                {notifications && notifications.map(notification => (
                    <TouchableOpacity key={notification.id_notification} style={styles.notificationContainer} onPress={() => handle_notification(notification.partage)}>
                        <Image source={{ uri: notification.source.profile_url }} style={styles.profileImage} />
                        <Text style={styles.notificationText}>
                            {notification.description} 
                        </Text>
                        <Text style={styles.notificationTime}>
                                {notification.time_elapsed}
                            </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        marginTop: 20,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700'
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    notificationText: {
        flexDirection: 'column',
        fontSize: 15,
        marginRight: 5
    },
    notificationTime: {
        fontSize: 14,
        fontWeight: '300',
    },
});

export default Notification;
