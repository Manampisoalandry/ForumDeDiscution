import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons'; // Importation de Ionicons depuis react-native-vector-icons
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Connection from './Connection';
import About from './About';
import Dashboard from './Dashboard';



const Welcome = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.white, 'rgba(46, 204, 113, 0.5)']}

        >
            {isLoading ? (
                <Loader />
            ) : (
                <View style={{ flex: 1 }}>
                    <View>
                        
                        <Image
                            source={require("../assets/hero3.jpg")}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                position: "absolute",
                                top: -10,
                                left: 200,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "-10deg" }
                                ]
                            }}
                        />

                        <Image
                            source={require("../assets/emoji.png")}
                            style={{
                                width: 180,
                                height: 120,
                                borderRadius: 20,
                                position: "absolute",
                                top: 20,
                                left: -50,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "5deg" }
                                ]
                            }}
                        />

                        <Image
                            source={require("../assets/fond.png")}
                            style={{
                                height: 200,
                                width: 240,
                                position: "absolute",
                                top: 100,
                                left: 50,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "-15deg" }
                                ]
                            }}
                        />
                    </View>

                    <View style={{
                        paddingHorizontal: 22,
                        position: "absolute",
                        top: 390,
                        width: "100%"
                    }}>
                        <Text style={{
                            fontSize: 36,
                            fontWeight: 800,
                            color: COLORS.white,
                            
                            
                        }}>Bienvenue sur <Text style={{
                            fontSize: 38,
                            fontWeight: 800,
                             color: '#2ecc71'
                            }}>MI<Text style={{ color: 'white', fontSize: 38 }}>zara</Text></Text> </Text>
                        
                        

                        <View style={{ marginVertical: 20, alignItems: 'center' }} >
                            <Text style={{
                                fontSize: 22,
                                color: COLORS.white,
                                marginVertical: 15,
                                fontWeight: 700,
                                
                            }}>Connectez-vous en tout confiance </Text>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                marginVertical: 4,
                                fontWeight: 700,
                                
                            }}>Besoin??de partager,de communiquer </Text>
                             <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                
                                fontWeight: 700,
                                
                            }}>  mizara est là pour vous offrir son aide </Text>
                           
                        </View>

                        <Button
                            title="Rejoignez-nous"
                            onPress={() => navigation.navigate("Login")}
                            style={{
                                marginTop: 25,
                                width: "56%",
                                marginLeft: 65,
                                height: 46,
                                borderColor:"#2ecc71",
                                backgroundColor:"#2ecc71",
                            }}
                        />

                        <View style={{
                            flexDirection: "row",
                            marginTop: 12,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight:600
                            }}>  Vous n'avez pas de compte? </Text>
                            <Pressable
                                onPress={() => navigation.navigate("Signup")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.grey,
                                    fontWeight: "700",
                                    
                                    
                                }}></Text>
                            </Pressable>

                        </View>
                    </View>

                    <Pressable
                        onPress={() => setShowMenu(!showMenu)}
                        style={{
                            position: 'absolute',
                            top: 50,
                            right: 20,
                        }}
                    >
                        <Ionicons name={showMenu ? "close" : "menu"} size={30} color="white" />
                    </Pressable>

                    {/* Affichage de la liste des options */}
                    {showMenu && (
                        <View style={{
                            position: 'absolute',
                            top: 100,
                            right: 20,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 10,
                            padding: 10,
                            zIndex: 2
                        }}>
                            <Pressable
                                onPress={() => navigation.navigate("Connection")}
                                style={{ marginBottom: 10 }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="log-in-outline" size={24} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 10 }}>Login</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate("About")}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="information-circle-outline" size={24} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 10 }}>About</Text>
                                </View>
                            </Pressable>
                        </View>
                    )}
                </View>
            )}
        </LinearGradient>
    );
}

export default Welcome;