import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Card from './Card';

const Chatbot = ({ id, t, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.chatbot} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
      <View style={styles.chatbotContainer}>
        <View style={styles.chatbotMessages}>
          <View style={styles.botMessage}>
            <Text style={styles.botIcon}>🤖</Text>
            <View style={styles.botMessageBubble}>
              <Text style={styles.botMessageText}>{t.chatWelcome}</Text>
            </View>
          </View>
        </View>
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder={t.placeholder}
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={styles.sendButton}>
            <FontAwesome5 name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default Chatbot;
