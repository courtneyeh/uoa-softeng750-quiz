import styles from './HomePage.module.css'
import MainButton from "./MainButton/MainButton";
import Title from "./Title/Title";
import useGet from "../../hooks/useGet";

export default function HomePage() {
  const {
    data: button,
    isLoading: buttonLoading
  } = useGet('/api/button', []);

  console.log(button);

  return (
    <div className={styles.homePage}>
      <Title/>
      {buttonLoading ? <p>Loading!</p> : <MainButton initialState={button?.pressed}/>}
    </div>
  );
}