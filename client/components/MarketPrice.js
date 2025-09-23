import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';

const MarketPrice = ({ id, t, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.marketPrice} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>{t.crop3}:</Text>
            <Text style={styles.marketPriceValue}>$7.20 / bushel</Text>
        </View>
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>{t.crop1}:</Text>
            <Text style={styles.marketPriceValue}>$5.85 / bushel</Text>
        </View>
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>{t.crop2}:</Text>
            <Text style={styles.marketPriceValue}>$13.50 / bushel</Text>
        </View>
    </Card>
  );
};

export default MarketPrice;
