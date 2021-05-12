import styles from './HomePage.module.css'
import MainButton from "./MainButton/MainButton";
import Title from "./Title/Title";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Title />
      <MainButton />
    </div>
  );
}