// src/components/NotificationList.tsx
import { RootState } from '@/store';
import { removeNotification } from '@/store/slices/notificationSlice';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const NotificationList = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = notifications.map((notification:any) => {
      if (notification.duration) {
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);
      }
      return null;
    });

    return () => {
      timers.forEach((timer:any) => timer && clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  return (
    <div className="notification-list">
      {notifications.map((notification:any) => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => dispatch(removeNotification(notification.id))}>Dismiss</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
