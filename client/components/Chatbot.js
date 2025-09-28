import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Speech from 'expo-speech';
import { FontAwesome5 } from '@expo/vector-icons';

// A simple component for displaying a single chat message bubble
const MessageBubble = ({ message, handleSpeakText, isSpeaking, showAvatar }) => {
  return (
    <View style={styles.messageRow}>
      {message.sender === 'bot' && showAvatar && (
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="robot" style={styles.avatarIcon} />
        </View>
      )}
      <View
        style={[
          styles.messageContainer,
          message.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            message.sender === 'user' ? styles.userMessageBubble : styles.botMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
          {message.sender === 'bot' && (
            <TouchableOpacity onPress={() => handleSpeakText(message.text)} disabled={isSpeaking} style={styles.speakButton}>
              <FontAwesome5 name="volume-up" style={[styles.speakButtonIcon, isSpeaking && styles.pulsatingIcon]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
       {message.sender === 'user' && showAvatar && (
        <Image
          source={require('../assets/CropImages/farmer.png')} // Use local asset
          style={styles.avatarImage}
        />
      )}
    </View>
  );
};


// The main application component
const Chatbot = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  // Set initial conversation once translations are available
  useEffect(() => {
    if (t && t.chat) {
        setMessages([
            { id: 1, text: "Hi there! I am your AI farming assistant. Ask me anything about crops, soil, pests, or weather.", sender: 'bot' },
            { id: 2, text: "What's the weather forecast for tomorrow?", sender: 'user' },
            {
              id: 3,
              text: t.chat.weatherResponse,
              sender: 'bot',
              quickReplies: ["Tell me more", "Pest forecast?", "Thanks!"]
            }
        ]);
    }
  }, [t]);


  // Simulates a bot response to a user query
  const simulateBotResponse = (userQuery) => {
    const queryLower = userQuery.toLowerCase();
    let botResponse = { text: t.chat.defaultResponse, quickReplies: [] };

    if (queryLower.includes('weather') || queryLower.includes('forecast')) {
      botResponse = {
          text: t.chat.weatherResponse,
          quickReplies: ["Tell me more", "Pest forecast?", "Thanks!"]
      };
    } else if (queryLower.includes('fertilizer') || queryLower.includes('nutrients')) {
      botResponse.text = t.chat.fertilizerResponse;
    } else if (queryLower.includes('pests') || queryLower.includes('insects')) {
      botResponse.text = t.chat.pestsResponse;
    } else if (queryLower.includes('soil health') || queryLower.includes('ph')) {
      botResponse.text = t.chat.soilHealthResponse;
    }

    setIsBotTyping(true);
    setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now() + 1, text: botResponse.text, sender: 'bot', quickReplies: botResponse.quickReplies },
        ]);
    }, 1500); // Simulate typing delay
  };

  // Handles sending a text message
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
    simulateBotResponse(text);
  };

  // Handles text-to-speech for bot responses
  const handleSpeakText = async (text) => {
    if (isSpeaking) {
        await Speech.stop();
    }
    setIsSpeaking(true);
    Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
    });
  };

  // Scrolls to the bottom of the chat view when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isBotTyping]);


  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContentContainer}
      >
        {messages.map((message, index) => (
           <MessageBubble
              key={message.id}
              message={message}
              handleSpeakText={handleSpeakText}
              isSpeaking={isSpeaking}
              showAvatar={index === 0 || messages[index-1].sender !== message.sender}
          />
        ))}
        {isBotTyping && (
            <View style={[styles.messageRow, styles.botMessageContainer]}>
               <View style={styles.avatarContainer}>
                  <FontAwesome5 name="robot" style={styles.avatarIcon} />
               </View>
               <View style={[styles.messageBubble, styles.botMessageBubble, styles.typingBubble]}>
                  <ActivityIndicator size="small" color="#047857" />
               </View>
            </View>
        )}
      </ScrollView>
      <View>
          {messages[messages.length-1]?.sender === 'bot' && messages[messages.length-1]?.quickReplies && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickReplyContainer}>
                  {messages[messages.length-1].quickReplies.map((reply, index) => (
                      <TouchableOpacity key={index} style={styles.quickReplyButton} onPress={() => handleSendMessage(reply)}>
                          <Text style={styles.quickReplyText}>{reply}</Text>
                      </TouchableOpacity>
                  ))}
              </ScrollView>
          )}
      </View>

      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.micButton}>
           <FontAwesome5 name="microphone" style={styles.micIcon} />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={t.chat.inputPlaceholder}
          onSubmitEditing={() => handleSendMessage(inputText)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSendMessage(inputText)}
        >
          <FontAwesome5 name="arrow-up" style={styles.sendButtonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 350, backgroundColor: '#f0fdf4', flex: 1 },
  chatArea: { flex: 1 },
  chatContentContainer: { padding: 10, flexGrow: 1, justifyContent: 'flex-end' },
  messageRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  avatarIcon: {
    fontSize: 18,
    color: '#4b5563',
  },
  userMessageContainer: { alignItems: 'flex-end', flex: 1 },
  botMessageContainer: { alignItems: 'flex-start', flex: 1 },
  messageBubble: { padding: 14, borderRadius: 20, maxWidth: '85%', flexDirection: 'row', alignItems: 'center' },
  userMessageBubble: { backgroundColor: '#dcfce7', borderBottomRightRadius: 5 },
  botMessageBubble: { backgroundColor: 'white', borderBottomLeftRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  messageText: { fontSize: 16, color: '#333', flexShrink: 1 },
  typingBubble: { padding: 14, width: 70, alignItems: 'center' },
  speakButton: { marginLeft: 10, padding: 2 },
  speakButtonIcon: { fontSize: 16, color: '#047857' },
  pulsatingIcon: { opacity: 0.5 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#e5e7eb' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#f9fafb' },
  sendButton: { backgroundColor: '#059669', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  sendButtonIcon: { color: '#fff', fontSize: 16 },
  micButton: { backgroundColor: '#e5e7eb', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  micIcon: { fontSize: 16, color: '#4b5563' },
  quickReplyContainer: { paddingHorizontal: 10, paddingVertical: 8 },
  quickReplyButton: {
      backgroundColor: 'white',
      borderColor: '#a7f3d0',
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
  },
  quickReplyText: { color: '#065f46', fontWeight: '500' },
});

export default Chatbot;

