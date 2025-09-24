import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
// A simple component for displaying a single chat message bubble
const MessageBubble = ({ message, handleSpeakText, isSpeaking }) => {
  return (
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
            <Text style={[styles.speakButtonText, isSpeaking && styles.pulsatingText]}>
              <Text>🔊</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// The main application component
const Chatbot = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null); // Ref for the TextInput component

  // Simulates a bot response to a user query
  const simulateBotResponse = (userQuery) => {
    const queryLower = userQuery.toLowerCase();
    let botResponse = t.chat.defaultResponse;

    if (queryLower.includes('weather') || queryLower.includes('forecast')) {
      botResponse = t.chat.weatherResponse;
    } else if (queryLower.includes('fertilizer') || queryLower.includes('nutrients')) {
      botResponse = t.chat.fertilizerResponse;
    } else if (queryLower.includes('pests') || queryLower.includes('insects')) {
      botResponse = t.chat.pestsResponse;
    } else if (queryLower.includes('soil health') || queryLower.includes('ph')) {
      botResponse = t.chat.soilHealthResponse;
    }

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: botResponse, sender: 'bot' },
      ]);
    }, 1000);
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
    if (isSpeaking) return;
    setIsSpeaking(true);
    await Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Handles the request for microphone permission
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to enable voice input.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Initializes the voice recognition module and requests permission
  useEffect(() => {
    const initVoice = async () => {
      const granted = await requestMicrophonePermission();
      setHasPermission(granted);

      if (granted) {
        Voice.onSpeechStart = () => {
          setIsListening(true);
          setInputText('Listening...');
        };
        Voice.onSpeechEnd = () => setIsListening(false);
        Voice.onSpeechResults = (event) => {
          const recognized = event.value[0];
          setInputText(recognized);
          handleSendMessage(recognized);
        };
        Voice.onSpeechError = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setInputText('');
        };
      }
      setIsVoiceReady(true);
    };

    initVoice();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Handles the voice input button press
  const handleSpeechInput = async () => {
    if (!hasPermission) {
      console.log('Microphone permission denied.');
      return;
    }
    
    // Check if the Voice module is initialized before attempting to use it.
    if (!Voice || !Voice.start) {
      console.error('Voice module or its start method is not available. Please ensure the library is correctly linked and configured.');
      return;
    }

    if (isListening) {
      await Voice.stop();
    } else {
      try {
        await Voice.start('en-US');
      } catch (e) {
        console.error('Failed to start voice recognition:', e);
      }
    }
  };

  // Scrolls to the bottom of the chat view when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Automatically focus on the text input when the component mounts
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContentContainer}
        >
          {messages.length === 0 && (
            <Text style={styles.initialMessage}>
              {t.chat.welcomeMessage}
            </Text>
          )}
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} handleSpeakText={handleSpeakText} isSpeaking={isSpeaking} />
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micListening]}
            onPress={handleSpeechInput}
            disabled={!isVoiceReady}
          >
            {!isVoiceReady ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : isListening ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.micText}>🎙️</Text>
            )}
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={isListening ? 'Listening...' : t.chat.inputPlaceholder}
            editable={!isListening}
            onSubmitEditing={() => handleSendMessage(inputText)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSendMessage(inputText)}
          >
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  chatContentContainer: {
    paddingBottom: 20,
    flexGrow: 1, // Allows the content to grow and push to the bottom
    justifyContent: 'flex-end', // Aligns content to the bottom
  },
  initialMessage: {
    textAlign: 'center',
    color: '#4b5563',
    fontStyle: 'italic',
    padding: 20,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessageBubble: {
    backgroundColor: '#dcfce7',
    borderBottomRightRadius: 4,
  },
  botMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  speakButton: {
    marginLeft: 8,
  },
  speakButtonText: {
    fontSize: 20,
    color: '#047857',
  },
  pulsatingText: {
    opacity: 0.5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    // The following styles were removed as KeyboardAvoidingView handles them
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#047857',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  micButton: {
    backgroundColor: '#22c55e',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  micListening: {
    backgroundColor: '#ef4444',
  },
  micText: {
    fontSize: 20,
  },
});

export default Chatbot;