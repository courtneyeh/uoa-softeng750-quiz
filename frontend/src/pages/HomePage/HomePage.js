import styles from './HomePage.module.css'
import MainButton from "./../../components/MainButton/MainButton";
import Title from "./../../components/Title/Title";
import useGet from "../../hooks/useGet";

export default function HomePage() {
  const {
    data: button,
    isLoading: buttonLoading
  } = useGet('/api/button', []);

  return (
    <div className={styles.homePage}>
      <Title/>
      {buttonLoading ? <p>Loading!</p> : <MainButton initialState={button?.pressed}/>}
    </div>
  );
}