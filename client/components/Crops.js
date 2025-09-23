import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';

const Crops = ({ crops, t, translateText, styles, pulseAnim }) => {
  return (
    <>
      <Text style={styles.pageTitle}>{t.manageCrops}</Text>
      {crops.map(crop => (
        <Card key={crop.id} title={translateText(crop.name)} styles={styles} pulseAnim={pulseAnim}>
          <View style={styles.cropItem}>
            <View style={styles.cropImagePlaceholder} />
            <View>
              <Text style={styles.cropText}>{t.plantingDate}: {crop.plantingDate}</Text>
              <Text style={styles.cropText}>{t.status}: {translateText(crop.status)}</Text>
            </View>
          </View>
        </Card>
      ))}
    </>
  );
};

export default Crops;
