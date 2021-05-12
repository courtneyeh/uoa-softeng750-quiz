import styles from './Title.module.css'

export default function Title() {

  return (
    <div className={styles.titleBlock}>
      <h1 className={styles.heading}>Courtney's Quiz</h1>
      <h2 className={styles.subtitle}>SOFTENG 750 | chun964</h2>
    </div>
  );
}