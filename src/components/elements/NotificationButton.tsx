// src/components/NotificationButton.tsx
import { addNotification } from '@/store/slices/notificationSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

const NotificationButton = () => {
  const dispatch = useDispatch();

  const handleAddNotification = () => {
    dispatch(addNotification({
      id: uuidv4(),
      message: 'This is a success notification!',
      type: 'success',
      duration: 5000, // 5 seconds
    }));
  };

  return <button onClick={handleAddNotification}>Show Notification</button>;
};

export default NotificationButton;
