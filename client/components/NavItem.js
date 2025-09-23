import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const NavItem = ({ icon, text, onPress, isActive, styles }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.navItemContainer,
      isActive ? styles.navItemActive : styles.navItemInactive,
    ]}
  >
    <FontAwesome5 name={icon} size={24} color={isActive ? 'white' : 'gray'} />
    <Text style={[styles.navItemText, isActive ? styles.navItemTextActive : styles.navItemTextInactive]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default NavItem;
