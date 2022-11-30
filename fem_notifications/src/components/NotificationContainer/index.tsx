import { useState } from 'react';
import { NotificationItem } from '../NotificationItem';
import styles from './styles.module.css';

export interface INotification {
  id: number;
  user: IUser;
  topic: ITopic;
  read: boolean;
}

export interface ITopic {
  id: number;
  content?: string;
  type: 'POST' | 'GROUP' | 'MESSAGE' | 'PICTURE' | 'FOLLOW';
  interaction: 'REACTION' | 'FOLLOW' | 'COMMENT' | 'PRIVATE' | 'JOIN' | 'LEFT';
  date: string;
}

export interface IUser {
  id: number;
  name: string;
  avatarUrl: string;
}

const notificationsMock : INotification[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Mark Webber',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-mark-webber.webp',
    },
    topic: {
      id: 1,
      content: 'My first tournament today',
      type: 'POST',
      interaction: 'REACTION',
      date: '2022-11-28T16:57:56.854Z'
    },
    read: false,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: 'Angela Gray',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-angela-gray.webp',
    },
    topic: {
      id: 2,
      type: 'FOLLOW',
      interaction: 'FOLLOW',
      date: '2022-11-27T13:03:56.854Z'
    },
    read: false,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: 'Jacob Thompson',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-jacob-thompson.webp',
    },
    topic: {
      id: 3,
      content: 'Chess Club',
      type: 'GROUP',
      interaction: 'JOIN',
      date: '2022-11-27T13:03:56.854Z',
    },
    read: false,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: 'Rizky Hasanuddin',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-rizky-hasanuddin.webp',
    },
    topic: {
      id: 4,
      content: 'Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game.',
      type: 'MESSAGE',
      interaction: 'PRIVATE',
      date: '2022-11-21T13:03:56.854Z',
    },
    read: true,
  },
  {
    id: 5,
    user: {
      id: 5,
      name: 'Kimberly Smith',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-kimberly-smith.webp',
    },
    topic: {
      id: 5,
      content: 'https://fem-notifications-two.vercel.app/images/image-chess.webp',
      type: 'PICTURE',
      interaction: 'COMMENT',
      date: '2022-11-21T13:03:56.854Z',
    },
    read: true,
  },
  {
    id: 6,
    user: {
      id: 6,
      name: 'Nathan Peterson',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-nathan-peterson.webp',
    },
    topic: {
      id: 6,
      content: '5 end-game strategies to increase your win rate',
      type: 'POST',
      interaction: 'REACTION',
      date: '2022-11-21T13:03:56.854Z',
    },
    read: true,
  },
  {
    id: 7,
    user: {
      id: 7,
      name: 'Anna Kim',
      avatarUrl: 'https://fem-notifications-two.vercel.app/images/avatar-anna-kim.webp',
    },
    topic: {
      id: 7,
      content: 'Chess Club',
      type: 'GROUP',
      interaction: 'LEFT',
      date: '2022-11-21T13:03:56.854Z',
    },
    read: true,
  }
];

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<INotification[] | []>(notificationsMock);

  function handleReadAll() {
    setNotifications(notifications.map((notification) => ({
      ...notification,
      read: true,
    })));
  }

  function handleMarkAsRead(id: number) {
    setNotifications(notifications.map(notification => {
      if (notification.id === id) {
        return {
          ...notification,
          read: true,
        };
      }

      return notification;
    }));
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles['header-notifications-container']}>
          <span style={{ fontWeight: 'bold', fontSize: 20 }}>Notifications</span>
          <strong className={styles['notifications-number']}>{notifications.filter(notification => !notification.read).length}</strong>
        </div>
        <div>
          <button type="button" className={styles['link-button']} onClick={handleReadAll}>
            Mark all as read
          </button>
        </div>
      </header>
      <div className={styles['notifications-container']}>
        { notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onNotificationClick={() => { handleMarkAsRead(notification.id); }}
          />
        ))}
      </div>
    </div>
  );
}
