import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import Txt from '../ui/UIText';

const ModalNotification = forwardRef(({ }, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    showNotification(msg: string) {
      setMessage(msg);
      setVisible(true);
    }
  }));

  useEffect(() => {
    let timeout: any;
    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 5000); // Duration
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <View style={[styles.container, visible ? styles.visible : styles.hidden]}>
      <View style={styles.innerContainer}>
        <Txt style={{ color: '#FFE900', fontSize: 17 }}>{message}</Txt>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9, // Ensure it's above other content
  },
  innerContainer: {
    backgroundColor: 'hsl(0 0% 20%)',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    top: 100,
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});

export default ModalNotification;