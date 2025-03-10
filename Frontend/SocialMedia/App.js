import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import Chat from './screens/Chat';
import DiscussionScreen from './screens/DiscussionScreen';
import SearchScreen from './screens/SearchScreen';
import ShareScreen from './screens/ShareScreen';
import ProfileScreen from './screens/ProfileScreen';
import PhotoShare from './screens/PhotoShare';
import FileShare from './screens/FileShare';
import VideoShare from './screens/VideoShare';
import About from './screens/About';
import Connection from './screens/Connection';
import Notification from './screens/Notification';
import Post from './screens/post';
import PublicationScreen from './screens/publication';
import Comment from './screens/Comment';
import DiscussionUsers from './screens/DiscussionUsers';
import CommentAnswer from './screens/CommentAnswer';





const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} 
        initialRouteName='Welcome'
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="PublicationScreen" component={PublicationScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="PhotoShare" component={PhotoShare} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="VideoShare" component={VideoShare} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Connection" component={Connection} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Post" component={Post}/>
        <Stack.Screen name='DiscussionUsers' component={DiscussionUsers}/>
        <Stack.Screen name='CommentAnswer' component={CommentAnswer}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;