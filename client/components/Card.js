import React from 'react';
import { View, Text, Animated } from 'react-native';

const Card = ({ title, id, children, styles, highlightedBlockId, pulseAnim }) => {
  const isHighlighted = highlightedBlockId === id;

  const pulseStyle = isHighlighted ? {
    transform: [{
      scale: pulseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.03, 1],
      }),
    }],
    borderColor: '#22c55e',
    borderWidth: 2,
    shadowColor: '#22c55e',
    shadowOpacity: pulseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 0.7, 0.3],
    }),
    shadowRadius: 15,

  } : {};

  return (
    <Animated.View style={[styles.cardContainer, pulseStyle]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        {children}
      </View>
    </Animated.View>
  );
};

export default Card;
