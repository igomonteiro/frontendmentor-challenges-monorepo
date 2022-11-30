import styles from './App.module.css';
import { NotificationContainer } from './components/NotificationContainer';

export default function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <NotificationContainer/>

      </div>
      <div className={styles.attribution}>
        Challenge by <a style={{ textDecoration: 'underline', color: 'blue' }} href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend
          Mentor</a>.
        Coded by <a style={{ textDecoration: 'underline', color: 'blue' }} href="https://github.com/igomonteiro">Igo Brasil Monteiro</a>.
      </div>
    </>
  );
}

