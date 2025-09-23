import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';

const Alerts = ({ id, alerts, t, translateText, clearAlerts, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.alerts} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
      {alerts.length > 0 ? (
        alerts.map(alert => (
          <View key={alert.id} style={styles.alertItem}>
            <View style={[styles.alertDot, { backgroundColor: alert.level === 'High' ? 'red' : 'orange' }]} />
            <Text style={styles.alertText}>{translateText(alert.text)}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAlertsText}>{t.noAlerts}</Text>
      )}
      {alerts.length > 0 && (
        <TouchableOpacity onPress={clearAlerts} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>{t.clearAll}</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

export default Alerts;
