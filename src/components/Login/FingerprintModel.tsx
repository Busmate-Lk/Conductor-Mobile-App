import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onCancel: () => void;
  onAuthenticate: () => void;
};

export default function FingerprintModal({ visible, onCancel, onAuthenticate }: Props) {
  const modalAnimation = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      Animated.spring(modalAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(modalAnimation, {
        toValue: height,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onCancel}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.fingerprintModal,
            { transform: [{ translateY: modalAnimation }] }
          ]}
          pointerEvents="auto"
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <FontAwesome5 name="lock" size={20} color="#D4AF37" />
                <Text style={styles.modalTitle}> Authentication Required</Text>
              </View>
              <Text style={styles.modalSubtitle}>Verify your identity</Text>
              <Text style={styles.modalInstruction}>Scan your fingerprint to authenticate</Text>
              <Text style={styles.modalSubInstruction}>Touch the fingerprint sensor</Text>
              <TouchableOpacity
                style={styles.fingerprintScan}
                onPress={onAuthenticate}
              >
                <View style={styles.fingerprintInner}>
                  <Ionicons name="finger-print" size={40} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.copyright}>© {new Date().getFullYear()} Busmate LK. All rights reserved.</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  fingerprintModal: {
    width: '100%',
    height: height * 0.5,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#15202B',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    marginBottom: 24,
  },
  modalInstruction: {
    fontSize: 16,
    color: '#D1D5DB',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubInstruction: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 40,
    textAlign: 'center',
  },
  fingerprintScan: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    padding: 8,
  },
  fingerprintInner: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  copyright: {
    color: '#9CA3AF',
    fontSize: 12,
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
  }
});