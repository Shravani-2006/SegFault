import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const AssistantModal = ({
  visible,
  onClose,
  currentStep,
  handleNextStep,
  isLastStep,
  t,
  styles,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.assistantBubble}>
          <Text style={styles.assistantTitle}>{currentStep.title}</Text>
          <Text style={styles.assistantText}>{currentStep.text}</Text>
          <View style={styles.assistantButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t.close}</Text>
            </TouchableOpacity>
            {!isLastStep && (
              <TouchableOpacity
                onPress={handleNextStep}
                style={[styles.modalButton, styles.modalNextButton]}
              >
                <Text style={styles.modalButtonText}>{t.next}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AssistantModal;
