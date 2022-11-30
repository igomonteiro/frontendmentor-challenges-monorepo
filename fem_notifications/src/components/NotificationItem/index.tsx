import styles from './styles.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { INotification } from '../NotificationContainer';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%d seconds',
    m: '1m',
    mm: '%dm',
    h: '1 hour',
    hh: '%dh',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
});

export interface INotificationItemProps {
  notification: INotification;
  onNotificationClick: () => void;
}

const TEXT_BY_TOPIC_TYPE = {
  'GROUP': 'group',
  'PICTURE': 'picture',
  'POST': 'post',
  'MESSAGE': '',
  'FOLLOW': '',
};

const TEXT_BY_TOPIC_INTERACTION = {
  'REACTION': 'reacted to your recent',
  'FOLLOW': 'followed you',
  'COMMENT': 'commented on your',
  'PRIVATE': 'sent you a private message',
  'JOIN': 'has joined your',
  'LEFT': 'left the',
};


export function NotificationItem({ notification, onNotificationClick }: INotificationItemProps) {

  function replaceDaysByWeeks(formattedDate: string) {
    if (formattedDate.includes('7 days')) {
      return formattedDate.replace('7 days', '1 week');
    } else if (formattedDate.includes('14 days')) {
      return formattedDate.replace('21 days', '2 weeks');
    } else if (formattedDate.includes('21 days')) {
      return formattedDate.replace('21 days', '3 weeks');
    }
    return formattedDate;
  }

  return (
    <div className={`${styles['notification-container']} ${!notification.read ? styles.active : ''}`}>
      <div className={styles['content-header']}>
        <img className={styles.avatar} src={notification.user.avatarUrl} alt="User avatar" />
        <div className={styles['content-body']}>
          <div>
            <a href={`/users/${notification.user.id}`} className={styles['username-link']}>{notification.user.name}</a>
            <span className={styles['notification-text']}>
              {(`
              ${TEXT_BY_TOPIC_INTERACTION[notification.topic.interaction]}
              ${TEXT_BY_TOPIC_TYPE[notification.topic.type]}
            `)}
            </span>

            {(notification.topic.type !== 'MESSAGE' && notification.topic.type !== 'PICTURE') ? (
              <a href={`/topics/${notification.topic.id}`} className={styles['post-link']}>
                {notification.topic.content}
              </a>
            ) : null }

            {!notification.read && (
              <span className={styles['notification-dot']} onClick={onNotificationClick}>
              </span>
            )}
          </div>

          <span className={styles.time}>
            { replaceDaysByWeeks(dayjs(notification.topic.date).fromNow()) }
          </span>

          { notification.topic.type === 'MESSAGE' && (
            <a href={`/topics/${notification.topic.id}`} className={styles['topic-content']}>
              {notification.topic.content}
            </a>
          )}
        </div>
      </div>

      { notification.topic.type === 'PICTURE' && (
        <a href={`/topics/${notification.topic.id}`}>
          <img className={styles.picture} src={notification.topic.content} alt="Picture" />
        </a>
      )}
    </div>
  );
}
