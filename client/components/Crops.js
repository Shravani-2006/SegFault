import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card'; // Assuming Card component is in the same folder or path is correct

const Crops = ({ crops, t, translateText, styles, pulseAnim }) => {
  return (
    <>
      <Text style={styles.pageTitle}>{t.manageCrops}</Text>
      {crops.map(crop => (
        <Card key={crop.id} title={translateText(crop.name)} styles={styles} pulseAnim={pulseAnim}>
          <View style={styles.cropItem}>
            {/* This line is already correct for local images */}
            <Image
              source={crop.imageUrl}
              style={styles.cropImagePlaceholder}
            />
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