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
} from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice'; // Import the voice recognition module

// Main application component
const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const scrollViewRef = useRef(null);

  // A very simple function to simulate a bot response.
  const simulateBotResponse = (userQuery) => {
    const queryLower = userQuery.toLowerCase();
    let botResponse = "I'm sorry, I don't have information on that topic. Please ask about common farming practices, crop diseases, or soil health.";

    if (queryLower.includes('weather') || queryLower.includes('forecast')) {
      botResponse = "The forecast for this week looks promising with moderate rainfall. It's an excellent time for planting and irrigation. Remember to check local weather reports for the most accurate data.";
    } else if (queryLower.includes('fertilizer') || queryLower.includes('nutrients')) {
      botResponse = "For corn crops, a balanced NPK fertilizer is essential, especially during the vegetative stage. A soil test will give you the most accurate nutrient needs for your specific field.";
    } else if (queryLower.includes('pests') || queryLower.includes('insects')) {
      botResponse = "Common pests like the corn earworm can be managed with integrated pest management (IPM) strategies. Consider using beneficial insects or targeted, low-impact pesticides.";
    } else if (queryLower.includes('soil health') || queryLower.includes('ph')) {
      botResponse = "Improving soil health is key to a successful harvest. Try adding organic matter like compost, practicing no-till farming, and using cover crops. Ideal soil pH is between 6.0 and 7.0 for most crops.";
    }

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: botResponse, sender: 'bot' },
      ]);
    }, 1000); // Simulate a network delay
  };

  // Handles sending a message
  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
    setRecognizedText(''); // Clear recognized text after sending
    simulateBotResponse(text);
  };

  // Handles text-to-speech for bot messages
  const handleSpeakText = async (text) => {
    if (isSpeaking) return;

    setIsSpeaking(true);
    await Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Setup the voice recognition listeners
  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => {
      const recognized = event.value[0];
      setInputText(recognized);
      setRecognizedText(recognized);
      handleSendMessage(recognized);
    };
    Voice.onSpeechError = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Function to handle speech input
  const handleSpeechInput = async () => {
    if (isListening) {
      await Voice.stop();
      setIsListening(false);
    } else {
      try {
        await Voice.start('en-US');
      } catch (e) {
        console.error('Failed to start voice recognition:', e);
      }
    }
  };

  // Scroll to the latest message
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🌾</Text>
        <Text style={styles.headerText}>Farmer's Assistant</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContentContainer}
      >
        {messages.length === 0 && (
          <Text style={styles.initialMessage}>
            Hi there! I am your AI farming assistant. Ask me anything about crops, soil, pests, or weather.
          </Text>
        )}
        {messages.map((message) => (
          <View
            key={message.id}
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
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={isListening ? 'Listening...' : 'Type your question...'}
          editable={!isListening}
          returnKeyType="send"
          onSubmitEditing={() => handleSendMessage(inputText)}
        />
        {isListening ? (
          <ActivityIndicator size="large" color="#3b82f6" style={styles.micButton} />
        ) : (
          <TouchableOpacity
            style={isListening ? styles.listeningButton : styles.micButton}
            onPress={handleSpeechInput}
          >
            <Text style={isListening ? styles.listeningText : styles.micText}>🎙️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage(inputText)}>
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#166534',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  chatContentContainer: {
    paddingBottom: 20,
  },
  initialMessage: {
    textAlign: 'center',
    color: '#71717a',
    fontStyle: 'italic',
    padding: 20,
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
    backgroundColor: '#e5e7eb',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  speakButton: {
    marginLeft: 8,
  },
  speakButtonText: {
    fontSize: 20,
    color: '#4b5563',
  },
  pulsatingText: {
    opacity: 0.5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#16a34a',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  micButton: {
    backgroundColor: '#3b82f6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  listeningButton: {
    backgroundColor: '#ef4444',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  micText: {
    fontSize: 20,
  },
  listeningText: {
    fontSize: 20,
  },
});

export default App;
