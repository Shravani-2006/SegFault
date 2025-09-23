import React from 'react';
import { Text } from 'react-native';
import Card from './Card';

const Recommendations = ({ id, t, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.recommendations} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
      <Text style={styles.recommendationText}>{t.recommendationText}</Text>
    </Card>
  );
};

export default Recommendations;
