import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';

const MarketPrice = ({ id, t, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.marketPrice || "Market Price"} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
        {/* Prices updated to reflect approximate market rates for Sept 27, 2025, in Kerala. */}
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>Rubber:</Text>
            {/* Price for RSS-4 Grade */}
            <Text style={styles.marketPriceValue}>₹ 17,800 / quintal</Text>
        </View>
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>Coconut:</Text>
             {/* Price for Dehusked Coconuts */}
            <Text style={styles.marketPriceValue}>₹ 2,700 / quintal</Text>
        </View>
        <View style={styles.marketPriceItem}>
            <Text style={styles.marketPriceLabel}>Paddy:</Text>
             {/* Market price often near the MSP */}
            <Text style={styles.marketPriceValue}>₹ 2,450 / quintal</Text>
        </View>
    </Card>
  );
};

export default MarketPrice;